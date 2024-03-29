﻿
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using API_StreamingUNED.Models;
using System;
using System.Collections.Generic;

namespace API_StreamingUNED.JwtHelpers
{
    public static class JwtHelpers
    {
        public static IEnumerable<Claim> GetClaims(this UserTokens userAccounts, Guid Id)
        {
            IEnumerable<Claim> claims = new Claim[] {
                new Claim("Id", userAccounts.UserId.ToString()),
                    new Claim(ClaimTypes.Role, userAccounts.RolName),
                    new Claim(ClaimTypes.Email, userAccounts.EmailId),
                    new Claim(ClaimTypes.NameIdentifier, userAccounts.EmailId),
                    new Claim(ClaimTypes.Expiration, DateTime.UtcNow.AddDays(1).ToString("MMM ddd dd yyyy HH:mm:ss tt"))
            };
            return claims;
        }
        public static IEnumerable<Claim> GetClaims(this UserTokens userAccounts, out Guid Id)
        {
            Id = Guid.NewGuid();
            return GetClaims(userAccounts, Id);
        }
        public static UserTokens GenTokenkey(UserTokens model, JwtSettings jwtSettings)
        {
            try
            {
                var UserToken = new UserTokens();
                if (model == null) throw new ArgumentException(nameof(model));
                // Get secret key
                var key = System.Text.Encoding.ASCII.GetBytes(jwtSettings.IssuerSigningKey);
                Guid Id = Guid.Empty;
                DateTime expiredTime = DateTime.UtcNow.AddDays(1);
                UserToken.Validaty = expiredTime.TimeOfDay;
                var JWToken = new JwtSecurityToken(
                    issuer: jwtSettings.ValidIssuer,
                    audience: jwtSettings.ValidAudience,
                    claims: GetClaims(model, out Id),
                    notBefore: new DateTimeOffset(DateTime.Now).DateTime,
                    expires: new DateTimeOffset(expiredTime).DateTime,
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
                    );

                UserToken.Token = new JwtSecurityTokenHandler().WriteToken(JWToken);
                UserToken.EmailId = model.EmailId;
                UserToken.UserId = model.UserId;
                UserToken.RolId = model.RolId;
                UserToken.RolName = model.RolName;
                UserToken.ExpiredTime = expiredTime;
                return UserToken;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static JwtSecurityToken ReadToken(string stream)
        { 
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(stream);
            return jsonToken as JwtSecurityToken;
        }

    }
}
using Microsoft.AspNetCore.Authorization; 
using Microsoft.AspNetCore.Mvc;
using API_StreamingUNED.Models;
using System.Collections.Generic;
using System.Linq;
using System;

namespace API_StreamingUNED.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UNED_streamingContext _context;
        private readonly JwtSettings jwtSettings;
        public AuthController(JwtSettings jwtSettings, UNED_streamingContext context)
        {
            this.jwtSettings = jwtSettings;
            _context = context;
        }
        private IEnumerable<Usuarios> logins = new List<Usuarios>() {
            new Usuarios() { 
                        CorreoElectronico = "adminakp@gmail.com", 
                        Clave = "Admin",
                },
                new Usuarios() { 
                        CorreoElectronico = "adminakp@gmail.com", 
                        Clave = "Admin",
                }
        };
        [HttpPost]
        public IActionResult GetToken(UserLogins userLogins)
        {
            try
            {
                var Token = new UserTokens();
                var Valid = logins.Any(x => x.CorreoElectronico.Equals(userLogins.UserName, StringComparison.OrdinalIgnoreCase));
                if (Valid)
                {
                    var user = logins.FirstOrDefault(x => x.CorreoElectronico.Equals(userLogins.UserName, StringComparison.OrdinalIgnoreCase));
                    Token = JwtHelpers.JwtHelpers.GenTokenkey(new UserTokens()
                    {
                        EmailId = user.CorreoElectronico, 
                        UserId = user.Id,
                        RolId = user.FkRol
                    }, jwtSettings);
                }
                else
                {
                    return BadRequest("wrong password");
                }
                return Ok(Token);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet("{username}/{password}")]
        public IActionResult GetToken(string username, string password)
        {
            try
            {
                var Token = new UserTokens();
                var Valid = _context.Usuarios.Where(x => x.CorreoElectronico.Equals(username) && x.Clave.Equals(password)).ToList().Count();
                if (Valid == 1)
                {
                    var user = _context.Usuarios.Where(x => x.CorreoElectronico.Equals(username) && x.Clave.Equals(password)).First();
                    Token = JwtHelpers.JwtHelpers.GenTokenkey(new UserTokens()
                    {
                        EmailId = user.CorreoElectronico,
                        UserId = user.Id,
                        RolId = user.FkRol
                    }, jwtSettings);
                }
                else
                {
                    return BadRequest("wrong password");
                }
                return Ok(Token);
            }
            catch (Exception ex)
            {
                throw;
            }
        } 

        [HttpPost]
        public IActionResult GetTokenPost(string username, string password)
        {
            try
            {
                var Token = new UserTokens();
                var Valid = _context.Usuarios.Where(x => x.CorreoElectronico.Equals(username) && x.Clave.Equals(password)).ToList().Count();
                if (Valid == 1)
                {
                    var user = _context.Usuarios.Where(x => x.CorreoElectronico.Equals(username) && x.Clave.Equals(password)).First();
                    Token = JwtHelpers.JwtHelpers.GenTokenkey(new UserTokens()
                    {
                        EmailId = user.CorreoElectronico,
                        UserId = user.Id,
                        RolId = user.FkRol
                    }, jwtSettings);
                }
                else
                {
                    return BadRequest("wrong password");
                }
                return Ok(Token);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        /// <summary>
        /// Get List of UserAccounts
        /// </summary>
        /// <returns>List Of UserAccounts</returns>
        [HttpGet]
        //[Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetList()
        {
            return Ok(logins);
        }
    }
}
using System;

namespace API_StreamingUNED.Models;
public class UserTokens
{
    public string Token
    {
        get;
        set;
    }
    public TimeSpan Validaty
    {
        get;
        set;
    }
    public string RefreshToken
    {
        get;
        set;
    }
    public string EmailId
    {
        get;
        set;
    }
    public int UserId
    {
        get;
        set;
    }
    public int RolId
    {
        get;
        set;
    }
    public DateTime ExpiredTime
    {
        get;
        set;
    }
    public string RolName { 
        get; 
        set; 
    }
}

using Microsoft.AspNetCore.Http;

namespace datingAPI.extensions
{
    public static class Extensions
    {
        public static void AddExceptionResponseHeaders(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Header", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
    }
}
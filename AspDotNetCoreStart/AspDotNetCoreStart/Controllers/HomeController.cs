using Microsoft.AspNetCore.Mvc;

namespace AspDotNetCoreStart.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Newtonsoft.Json;

namespace Web.Controllers
{
    public class ProfileController : Controller
    {
        public ActionResult Index()
        {
			//Get logged in user id
			var id = "";
			if (Session["id"] != null && !string.IsNullOrEmpty(Session["id"].ToString()))
			{
				id = Session["id"].ToString();
			}
			if (string.IsNullOrEmpty(id))
			{
				//if user is not logged in return to home
				return RedirectToAction("Index", "Home");
			}

			var volunteer = VolunteerManager.getVolunteer(id);
            return View(volunteer);
        }

		public ActionResult Profile(string id)
		{
			var volunteer = VolunteerManager.getVolunteer(id);
			return View("Index", volunteer);
		}

		public ActionResult Register()
		{
			return View();
		}

		[HttpPost]
		public ActionResult RegisterNew()
		{
			var resolveRequest = HttpContext.Request;
			resolveRequest.InputStream.Seek(0, SeekOrigin.Begin);
			var json = new StreamReader(resolveRequest.InputStream).ReadToEnd();
			var parameters = JsonConvert.DeserializeObject<RegisterParams>(json);

			ProfileManager.registerVolunteer(parameters);

			return RedirectToAction("Login");
		}

		public ActionResult Login()
		{
			return View();
		}

		[HttpPost]
		public ActionResult LoginUser()
		{
			var resolveRequest = HttpContext.Request;
			resolveRequest.InputStream.Seek(0, SeekOrigin.Begin);
			var json = new StreamReader(resolveRequest.InputStream).ReadToEnd();
			var parameters = JsonConvert.DeserializeObject<LoginParams>(json);

			//Login user
			var user = ProfileManager.login(parameters.email, parameters.password);

			if (user != null)
			{
				//login was okay
				Session["email"] = user.email;
				Session["id"] = user.id;
				Session["picture"] = user.picture;
				Session["fullName"] = user.fullName;
			}
			else
			{
				//it was bad

			}

			return RedirectToAction("Index", "Home");
		}
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class VolunteersController : Controller
    {
        public ActionResult Index()
        {
			var volunteers = VolunteerManager.getVolunteers();
			if (volunteers == null)
				volunteers = new Volunteer[] { };
            return View(volunteers);
        }
    }
}

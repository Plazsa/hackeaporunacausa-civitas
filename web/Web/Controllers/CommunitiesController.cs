using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class CommunitiesController : Controller
    {
        public ActionResult Index()
        {
			var communities = CommunityManager.getCommunities();
			if (communities == null)
				communities = new Community[] { };
			return View(communities);
        }

		public ActionResult Profile(string id)
		{
			var community = CommunityManager.getCommunity(id);
			if (community == null)
				community = new Community();
			return View(community);
		}
    }
}

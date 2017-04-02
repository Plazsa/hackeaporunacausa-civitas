using System;
using System.IO;
using System.Net;
using Newtonsoft.Json;

namespace Web
{
	public class ProfileManager
	{
		public static Volunteer registerVolunteer(RegisterParams parameters)
		{
			//get id and request voluntee
			try
			{
				var httpReq = (HttpWebRequest)WebRequest.Create(globalVar.server+"/register");
				httpReq.Method = "POST";
				httpReq.ContentType = httpReq.Accept = "application/json";
				var json = JsonConvert.SerializeObject(parameters);
				using (var inStream = httpReq.GetRequestStreamAsync().Result)
				using (var inStreamWriter = new StreamWriter(inStream))
				{
					inStreamWriter.Write(json);
				}
				using (var response = (HttpWebResponse)httpReq.GetResponseAsync().Result)
				{
					using (var outStream = response.GetResponseStream())
					using (var inReader = new StreamReader(outStream))
					{
						if (response.StatusCode == HttpStatusCode.Accepted || response.StatusCode == HttpStatusCode.OK)
						{
							var id = inReader.ReadToEnd();
							var user = VolunteerManager.getVolunteer(JsonConvert.DeserializeObject<Id>(id).id);
							return user;
						}
						return null;
					}
				}
			}
			catch (Exception e)
			{
				return null;
			}
		

			return null;
		}

		public static Volunteer login(string email, string password)
		{
			var parameters = new LoginParams { email = email, password = password };

			//get id and request voluntee
			try
			{
				var httpReq = (HttpWebRequest)WebRequest.Create(globalVar.server + "/login");
				httpReq.Method = "POST";
				httpReq.ContentType = httpReq.Accept = "application/json";
				var json = JsonConvert.SerializeObject(parameters);
				using (var inStream = httpReq.GetRequestStreamAsync().Result)
				using (var inStreamWriter = new StreamWriter(inStream))
				{
					inStreamWriter.Write(json);
				}
				using (var response = (HttpWebResponse)httpReq.GetResponseAsync().Result)
				{
					using (var outStream = response.GetResponseStream())
					using (var inReader = new StreamReader(outStream))
					{
						if (response.StatusCode == HttpStatusCode.Accepted || response.StatusCode == HttpStatusCode.OK)
						{
							var id = inReader.ReadToEnd();
							var user = VolunteerManager.getVolunteer(JsonConvert.DeserializeObject<Id>(id).id);
							return user;
						}
						return null;
					}
				}
			}
			catch (Exception e)
			{
				return null;
			}


			return null;
		}
	}
}

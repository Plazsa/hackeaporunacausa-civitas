using System;
using System.IO;
using System.Net;
using Newtonsoft.Json;

namespace Web
{
	public class CommunityManager
	{
		public static Community[] getCommunities()
		{
			try
			{
				var httpReq = (HttpWebRequest)WebRequest.Create(globalVar.server + "/communities");
				httpReq.Method = "GET";
				httpReq.ContentType = httpReq.Accept = "application/json";
				using (var response = (HttpWebResponse)httpReq.GetResponseAsync().Result)
				{
					using (var outStream = response.GetResponseStream())
					using (var inReader = new StreamReader(outStream))
					{
						if (response.StatusCode != HttpStatusCode.Accepted && response.StatusCode != HttpStatusCode.OK)
						{
							return null;
						}
						else
						{
							var json = inReader.ReadToEnd();
							var result = JsonConvert.DeserializeObject<Community[]>(json);
							return result;
						}
					}
				}
			}
			catch (Exception e)
			{
				return null;
			}
		}

		public static Community getCommunity(string id)
		{
			try
			{
				var httpReq = (HttpWebRequest)WebRequest.Create(globalVar.server + "/communities/" + id);
				httpReq.Method = "GET";
				httpReq.ContentType = httpReq.Accept = "application/json";
				using (var response = (HttpWebResponse)httpReq.GetResponseAsync().Result)
				{
					using (var outStream = response.GetResponseStream())
					using (var inReader = new StreamReader(outStream))
					{
						if (response.StatusCode != HttpStatusCode.Accepted && response.StatusCode != HttpStatusCode.OK)
						{
							return null;
						}
						else
						{
							var json = inReader.ReadToEnd();
							var result = JsonConvert.DeserializeObject<Community>(json);
							return result;
						}
					} 
				}
			}
			catch (Exception e)
			{
				return null;
			}
		}
	}
}

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Webmap_1A.Hubs;
using Webmap_1A.Models;

namespace Webmap_1A.Services
{
    public class WreckersRepository
    {
        public IEnumerable<Wrecker> GetWreckers()
        {
            using(var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Webmap_1AContext"].ConnectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(@"SELECT [WreckerId],[PlateNum],[CurrentDriver_DriverId],[CurrentLocation_Lat],[CurrentLocation_Lng]
               FROM [dbo].[Wreckers]", connection))
                {
                    // Make sure the command object does not already have
                    // a notification object associated with it.
                    command.Notification = null;

                    SqlDependency dependency = new SqlDependency(command);
                    dependency.OnChange += new OnChangeEventHandler(dependency_OnChange);

                    if (connection.State == ConnectionState.Closed)
                        connection.Open();

                    using (var reader = command.ExecuteReader()) {
                        List<Wrecker> wreckers = reader.Cast<IDataRecord>()
                            .Select(x => new Wrecker()
                            {
                                WreckerId =(int) x["WreckerId"],
                                PlateNum = (string)x["PlateNum"],
                                CurrentDriver = new Driver()
                                {
                                    DriverId = (int)x["CurrentDriver_DriverId"]
                                },
                                CurrentLocation = new Location()
                                {
                                    Lat = (float)x["CurrentLocation_Lat"],
                                    Lng = (float)x["CurrentLocation_Lng"]
                                }
                            }).ToList();
                        return wreckers;
                    }
                        
                }
            }
        }

        private void dependency_OnChange(object sender, SqlNotificationEventArgs e)
        {
            Webmap_1AContext context = new Webmap_1AContext();
            //Wrecker wreckerToUpdate = context.Wreckers.Where(b => b.WreckerId == sender.ObjectId);
            WebmapHub.SendLocation(((Wrecker)sender).WreckerId, ((Wrecker)sender).CurrentLocation);
        }
    }
}
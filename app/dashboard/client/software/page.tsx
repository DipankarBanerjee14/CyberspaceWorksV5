// "use client";

// import { useEffect, useState } from "react";

// interface SoftwareClient {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;

//   softwareId: string;
//   softwareName: string;

//   plan: string;
//   tenure: string;
//   source: string;

//   contractStartDate: string;
//   contractEndDate: string;

//   notes?: string;

//   createdAt?: string;
// }

// export default function MySoftwarePage() {
//   const [loading, setLoading] = useState(true);
//   const [clients, setClients] = useState<SoftwareClient[]>([]);
//   const [userEmail, setUserEmail] = useState("");

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         // Logged-in user
//         const userRes = await fetch("/api/auth/me");
//         const userData = await userRes.json();

//         const email = userData?.user?.email;

//         setUserEmail(email);

//         // Software Clients
//         const res = await fetch("/api/software-client");
//         const data = await res.json();

//         const filtered =
//           data.clients?.filter(
//             (client: SoftwareClient) =>
//               client.email === email
//           ) || [];

//         setClients(filtered);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-8 text-center">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold">
//           My Software
//         </h1>

//         <p className="text-muted-foreground mt-2">
//           {clients.length} Software Account
//           {clients.length !== 1 ? "s" : ""}
//         </p>
//       </div>

//       {clients.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-24">
//           <h2 className="text-7xl font-bold">
//             0
//           </h2>

//           <p className="text-muted-foreground mt-4">
//             No Software Assigned
//           </p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto rounded-xl border">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b bg-muted/40">
//                 <th className="p-4 text-left">
//                   Software
//                 </th>

//                 <th className="p-4 text-left">
//                   Plan
//                 </th>

//                 <th className="p-4 text-left">
//                   Tenure
//                 </th>

//                 <th className="p-4 text-left">
//                   Start Date
//                 </th>

//                 <th className="p-4 text-left">
//                   End Date
//                 </th>

//                 <th className="p-4 text-left">
//                   Phone
//                 </th>

//                 <th className="p-4 text-left">
//                   Status
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {clients.map((client) => {
//                 const expired =
//                   new Date(client.contractEndDate) <
//                   new Date();

//                 return (
//                   <tr
//                     key={client._id}
//                     className="border-b"
//                   >
//                     <td className="p-4 font-medium">
//                       {client.softwareName}
//                     </td>

//                     <td className="p-4">
//                       {client.plan}
//                     </td>

//                     <td className="p-4">
//                       {client.tenure}
//                     </td>

//                     <td className="p-4">
//                       {new Date(
//                         client.contractStartDate
//                       ).toLocaleDateString()}
//                     </td>

//                     <td className="p-4">
//                       {new Date(
//                         client.contractEndDate
//                       ).toLocaleDateString()}
//                     </td>

//                     <td className="p-4">
//                       {client.phone}
//                     </td>

//                     <td className="p-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs ${
//                           expired
//                             ? "bg-red-500/20 text-red-500"
//                             : "bg-green-500/20 text-green-500"
//                         }`}
//                       >
//                         {expired
//                           ? "Expired"
//                           : "Active"}
//                       </span>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

interface SoftwareClient {
  _id: string;
  name: string;
  email: string;
  phone: string;

  softwareId: string;
  softwareName: string;

  plan: string;
  tenure: string;
  source: string;

  contractStartDate: string;
  contractEndDate: string;

  notes?: string;

  createdAt?: string;
}

export default function MySoftwarePage() {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<SoftwareClient[]>([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        // Logged-in user
        const userRes = await fetch("/api/auth/me");
        const userData = await userRes.json();

        const email = userData?.user?.email;

        setUserEmail(email);

        // Software Clients
        const res = await fetch("/api/software-client");
        const data = await res.json();

        const filtered =
          data.clients?.filter(
            (client: SoftwareClient) => client.email === email
          ) || [];

        setClients(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-foreground">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          My Software
        </h1>

        <p className="text-muted-foreground mt-2">
          {clients.length} Software Account
          {clients.length !== 1 ? "s" : ""}
        </p>
      </div>

      {clients.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24">
          <h2 className="text-7xl font-bold text-foreground">
            0
          </h2>

          <p className="text-muted-foreground mt-4">
            No Software Assigned
          </p>
        </div>
      ) : (
        /* Table */
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                  Software
                </th>

                <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                  Plan
                </th>

                <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                  Tenure
                </th>

                <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                  Start Date
                </th>

                <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                  End Date
                </th>

                <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                  Phone
                </th>

                <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {clients.map((client) => {
                const expired =
                  new Date(client.contractEndDate) < new Date();

                return (
                  <tr
                    key={client._id}
                    className="border-b border-border bg-background transition-colors hover:bg-muted/30"
                  >
                    <td className="p-4 font-medium text-foreground">
                      {client.softwareName}
                    </td>

                    <td className="p-4 text-foreground">
                      {client.plan}
                    </td>

                    <td className="p-4 text-foreground">
                      {client.tenure}
                    </td>

                    <td className="p-4 text-foreground">
                      {new Date(
                        client.contractStartDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-foreground">
                      {new Date(
                        client.contractEndDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-foreground">
                      {client.phone}
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          expired
                            ? "bg-red-500/15 text-red-500 dark:bg-red-500/20 dark:text-red-400"
                            : "bg-green-500/15 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                        }`}
                      >
                        {expired ? "Expired" : "Active"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
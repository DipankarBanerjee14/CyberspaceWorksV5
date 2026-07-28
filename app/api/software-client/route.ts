// import { NextResponse } from "next/server";
// import {connectToDatabase} from "@/lib/mongodb";
// import SoftwareClient from "../../../lib/models/SoftwareClient";
// import nodemailer from "nodemailer";
// import bcrypt from "bcryptjs";
// import {
//   cyberProjectsDB,
//   cyberLedgerDB,
//   cyberClinicDB,
//   cyberPharmaDB,
//   cyberRetailDB,
//   cyberPayrollDB,
//   cyberInvoiceDB,
//   cyberDineDB,
//   cyberPayrollDBBasic,
//   cyberClinicDBBasic,
//   cyberPharmaDBBasic,
//   cyberProjectDBBasic,
//   cyberLedgerDBBasic,
//   cyberRetailDBBasic,
//   cyberInvoiceDBBasic,
//   cyberDineDBBasic,
// } from "@/lib/databaseConnection";

// import { ProductUserSchema } from "@/lib/models/ProductUser";

// export async function POST(req: Request) {
//   try {
//     await connectToDatabase();
// //     const SOFTWARE_DB_MAP = {
// //   CyberProjects: cyberProjectsDB,
// //   CyberLedger: cyberLedgerDB,
// //   CyberClinic: cyberClinicDB,
// //   CyberPharma: cyberPharmaDB,
// //   CyberRetail: cyberRetailDB,
// //   CyberPayroll: cyberPayrollDB,
// //   CyberInvoice: cyberInvoiceDB,
// //   CyberDine: cyberDineDB,
// // };
// // const PLAN_DB_MAP={
// //   CyberPayrollBasic:cyberPayrollDBBasic,
// //   CyberClinicBasic:cyberClinicDBBasic,
// //   CyberPharmaBasic:cyberPharmaDBBasic,
// //   CyberProjectsBasic:cyberProjectDBBasic,
// //   CyberLedgerBasic:cyberLedgerDBBasic,
// //   CyberRetailBasic:cyberRetailDBBasic,
// //   CyberInvoiceBasic:cyberInvoiceDBBasic,
// //   CyberDineBasic:cyberDineDBBasic,

// // }
// const BUSINESS_DB_MAP = {
//   CyberProjects: cyberProjectsDB,
//   CyberLedger: cyberLedgerDB,
//   CyberClinic: cyberClinicDB,
//   CyberPharma: cyberPharmaDB,
//   CyberRetail: cyberRetailDB,
//   CyberPayroll: cyberPayrollDB,
//   CyberInvoice: cyberInvoiceDB,
//   CyberDine: cyberDineDB,
// };

// const BASIC_DB_MAP = {
//   CyberProjects: cyberProjectDBBasic,
//   CyberLedger: cyberLedgerDBBasic,
//   CyberClinic: cyberClinicDBBasic,
//   CyberPharma: cyberPharmaDBBasic,
//   CyberRetail: cyberRetailDBBasic,
//   CyberPayroll: cyberPayrollDBBasic,
//   CyberInvoice: cyberInvoiceDBBasic,
//   CyberDine: cyberDineDBBasic,
// };



//     const body = await req.json();
//     console.log("Received body:", body);

//     const client = await SoftwareClient.create({
//       name: body.name,
//       email: body.email,
//       password: body.password,
//       phone: body.phone,

//       softwareId: body.softwareId,
//       softwareName: body.softwareName,

//       plan: body.plan,
//       tenure: body.tenure,
//       source: body.source,

//       contractStartDate: body.contractStartDate,
//       contractEndDate: body.contractEndDate,
//       notes: body.notes,
//     });
//     console.log(client);
//    const targetDB =
//   body.plan === "Basic"
//     ? BASIC_DB_MAP[
//         body.softwareName as keyof typeof BASIC_DB_MAP
//       ]
//     : BUSINESS_DB_MAP[
//         body.softwareName as keyof typeof BUSINESS_DB_MAP
//       ];
 

// // if (targetDB) {
// //   const ProductUser =
// //     targetDB.models.User ||
// //     targetDB.model(
// //       "User",
// //       ProductUserSchema
// //     );

// // const hashedPassword = await bcrypt.hash(
// //   body.password,
// //   12
// // );

// // // await ProductUser.create({
// // //   name: body.name,
// // //   email: body.email,
// // //   password: hashedPassword,
// // //   passwordHash: hashedPassword,
// // //   role: "admin",
// // //   phone: body.phone,

// // //   softwareName: body.softwareName,
// // //   plan: body.plan,

// // //   contractStartDate:
// // //     body.contractStartDate,

// // //   contractEndDate:
// // //     body.contractEndDate,
// // // });

// // const isSuperAdminSoftware =
// //   body.softwareName === "CyberPharma" ||
// //   body.softwareName === "CyberClinic";

// // await ProductUser.create({
// //   name: body.name,
// //   email: body.email,
// //   password: hashedPassword,
// //   passwordHash: hashedPassword,

// //   role: isSuperAdminSoftware ? "super_admin" : "admin",

// //   phone: body.phone,
// //   softwareName: body.softwareName,
// //   plan: body.plan,
// //   contractStartDate: body.contractStartDate,
// //   contractEndDate: body.contractEndDate,
// // });
// // }
// if (targetDB) {
//   const ProductUser =
//     targetDB.models.User ||
//     targetDB.model(
//       "User",
//       ProductUserSchema
//     );

//   const hashedPassword =
//     await bcrypt.hash(
//       body.password,
//       12
//     );
// let tenantId = "";
//   // Determine role based on software and plan
//   const isSuperAdminSoftware =
//     (body.softwareName === "CyberPharma" ||
//     body.softwareName === "CyberClinic")&&(body.plan!=="Basic");

//   // Default role logic: super_admin for specific softwares, otherwise admin
//   let role = isSuperAdminSoftware ? "super_admin" : "admin";
//   tenantId="69f07229f7ea9a484075c23f"

//   // Additional rule: if the software is CyberPayroll and the plan is Basic, set role to "hr"
//   if (
//     body.softwareName === "CyberPayroll" &&
//     body.plan === "Basic"
//   ) {
//     role = "hr";
//   }
//   if (
//     body.softwareName === "CyberDine" &&
//     body.plan === "Basic"
//   ) {
//     role = "manager";
//   }

//   await ProductUser.create({
//     name: body.name,
//     email: body.email,
//     password: hashedPassword,
//     passwordHash: hashedPassword,
//     role: role,
//     phone: body.phone,
//     tenantId: tenantId,
//     softwareName: body.softwareName,
//     plan: body.plan,
//     contractStartDate: body.contractStartDate,
//     contractEndDate: body.contractEndDate,
//   });
// }
// console.log("hello");

//     const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// await transporter.sendMail({
//   from: process.env.EMAIL_USER,
//   to: body.email,
//   subject: `Welcome to ${body.softwareName}`,
//   html: `
//     <h2>Hello ${body.name}</h2>

//     <p>Your account has been created successfully.</p>

//     <table border="1" cellpadding="8" cellspacing="0">
//       <tr>
//         <td><strong>Software</strong></td>
//         <td>${body.softwareName}</td>
//       </tr>

//       <tr>
//         <td><strong>Email</strong></td>
//         <td>${body.email}</td>
//       </tr>

//       <tr>
//         <td><strong>Password</strong></td>
//         <td>${body.password}</td>
//       </tr>

//       <tr>
//         <td><strong>Plan</strong></td>
//         <td>${body.plan}</td>
//       </tr>

//       <tr>
//         <td><strong>Tenure</strong></td>
//         <td>${body.tenure}</td>
//       </tr>
//     </table>

//     <br/>

//     <p>Thank you for choosing ${body.softwareName}.</p>
//   `,
// });

// let registerData = null;

// try {
//   const registerResponse = await fetch(
//     "https://pharma-managebasic-wgi8.vercel.app/api/auth/register",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name: body.name,
//         email: body.email,
//         password: body.password,
//         phone: body.phone,
//         role: "admin", // same role you calculated
//         plan: body.plan,
//         contractStartDate: body.contractStartDate,
//         contractEndDate: body.contractEndDate,
//       }),
//     }
//   );

//   registerData = await registerResponse.json();

//   console.log(
//     "External Register API Response:",
//     registerData
//   );
// } catch (error) {
//   console.error(
//     "External Register API Error:",
//     error
//   );
// }
//     return NextResponse.json({
//       success: true,
//       client,
//       message: "Client added successfully",
//     });
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     await connectToDatabase();

//     const clients = await SoftwareClient.find().sort({
//       createdAt: -1,
//     });

//     const now = new Date();

//     const currentWeek = new Date();
//     currentWeek.setDate(now.getDate() - 7);

//     const previousWeek = new Date();
//     previousWeek.setDate(now.getDate() - 14);

//     // Current week
//     const currentWeekClients = clients.filter(
//       (c) => new Date(c.createdAt) >= currentWeek
//     );

//     // Previous week
//     const previousWeekClients = clients.filter(
//       (c) =>
//         new Date(c.createdAt) >= previousWeek &&
//         new Date(c.createdAt) < currentWeek
//     );

//     const totalOrders = clients.length;

//     const basicOrders = clients.filter(
//       (c) => c.plan === "Basic"
//     ).length;

//     const businessOrders = clients.filter(
//       (c) => c.plan === "Business"
//     ).length;

//     const enterpriseOrders = clients.filter(
//       (c) => c.plan === "Enterprise"
//     ).length;

//     const currentOrders = currentWeekClients.length;
//     const previousOrders = previousWeekClients.length;

//     const orderGrowth =
//       previousOrders === 0
//         ? 100
//         : (
//             ((currentOrders - previousOrders) /
//               previousOrders) *
//             100
//           ).toFixed(1);

//     const currentBasic = currentWeekClients.filter(
//       (c) => c.plan === "Basic"
//     ).length;

//     const previousBasic = previousWeekClients.filter(
//       (c) => c.plan === "Basic"
//     ).length;

//     const basicGrowth =
//       previousBasic === 0
//         ? 100
//         : (
//             ((currentBasic - previousBasic) /
//               previousBasic) *
//             100
//           ).toFixed(1);

//     const currentBusiness = currentWeekClients.filter(
//       (c) => c.plan === "Business"
//     ).length;

//     const previousBusiness = previousWeekClients.filter(
//       (c) => c.plan === "Business"
//     ).length;

//     const businessGrowth =
//       previousBusiness === 0
//         ? 100
//         : (
//             ((currentBusiness -
//               previousBusiness) /
//               previousBusiness) *
//             100
//           ).toFixed(1);

//     const currentEnterprise =
//       currentWeekClients.filter(
//         (c) => c.plan === "Enterprise"
//       ).length;

//     const previousEnterprise =
//       previousWeekClients.filter(
//         (c) => c.plan === "Enterprise"
//       ).length;

//     const enterpriseGrowth =
//       previousEnterprise === 0
//         ? 100
//         : (
//             ((currentEnterprise -
//               previousEnterprise) /
//               previousEnterprise) *
//             100
//           ).toFixed(1);

//     return NextResponse.json({
//       success: true,

//       clients,

//       totalOrders,

//       basicOrders,
//       businessOrders,
//       enterpriseOrders,

//       orderGrowth,
//       basicGrowth,
//       businessGrowth,
//       enterpriseGrowth,
//     });
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: error.message,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }





import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/mongodb";
import SoftwareClient from "../../../lib/models/SoftwareClient";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import {
  cyberProjectsDB,
  cyberLedgerDB,
  cyberClinicDB,
  cyberPharmaDB,
  cyberRetailDB,
  cyberPayrollDB,
  cyberInvoiceDB,
  cyberDineDB,
  cyberPayrollDBBasic,
  cyberClinicDBBasic,
  cyberPharmaDBBasic,
  cyberProjectDBBasic,
  cyberLedgerDBBasic,
  cyberRetailDBBasic,
  cyberInvoiceDBBasic,
  cyberDineDBBasic,
} from "@/lib/databaseConnection";

import { ProductUserSchema } from "@/lib/models/ProductUser";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const BUSINESS_DB_MAP = {
      CyberProjects: cyberProjectsDB,
      CyberLedger: cyberLedgerDB,
      CyberClinic: cyberClinicDB,
      CyberPharma: cyberPharmaDB,
      CyberRetail: cyberRetailDB,
      CyberPayroll: cyberPayrollDB,
      CyberInvoice: cyberInvoiceDB,
      CyberDine: cyberDineDB,
    };

    const BASIC_DB_MAP = {
      CyberProjects: cyberProjectDBBasic,
      CyberLedger: cyberLedgerDBBasic,
      CyberClinic: cyberClinicDBBasic,
      CyberPharma: cyberPharmaDBBasic,
      CyberRetail: cyberRetailDBBasic,
      CyberPayroll: cyberPayrollDBBasic,
      CyberInvoice: cyberInvoiceDBBasic,
      CyberDine: cyberDineDBBasic,
    };

    const body = await req.json();
    console.log("Received body:", body);

    const client = await SoftwareClient.create({
      name: body.name,
      email: body.email,
      password: body.password,
      phone: body.phone,
      softwareId: body.softwareId,
      softwareName: body.softwareName,
      plan: body.plan,
      tenure: body.tenure,
      source: body.source,
      contractStartDate: body.contractStartDate,
      contractEndDate: body.contractEndDate,
      notes: body.notes,
    });

    console.log(client);

    const targetDB =
      body.plan === "Basic"
        ? BASIC_DB_MAP[body.softwareName as keyof typeof BASIC_DB_MAP]
        : BUSINESS_DB_MAP[body.softwareName as keyof typeof BUSINESS_DB_MAP];

    if (targetDB) {
      // const isCyberPharmaOrClinicBasic =
      //   (body.softwareName === "CyberPharma" ||
      //     body.softwareName === "CyberClinic") &&
      //   body.plan === "Basic";

      const isCyberPharmaOrClinicBasic =
  (body.softwareName === "CyberPharma" ||
    body.softwareName === "CyberClinic") &&
  body.plan === "Basic";

if (isCyberPharmaOrClinicBasic) {
  const registerUrl =
    body.softwareName === "CyberPharma"
      ? "https://cyberpharmabasic.cyberspaceworks.com/api/auth/register"
      : "https://cyberclinicbasic.cyberspaceworks.com/api/auth/register";

  try {
    const registerResponse = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        password: body.password,
        phone: body.phone,
        role: "admin",
        plan: body.plan,
        contractStartDate: body.contractStartDate,
        contractEndDate: body.contractEndDate,
      }),
    });

    const registerData = await registerResponse.json();

    console.log(
      `${body.softwareName} Register Response:`,
      registerData
    );
  } catch (error) {
    console.error(
      `${body.softwareName} Register Error:`,
      error
    );
  }
} else {
        // Normal flow for all other software/plan combos
        const ProductUser =
          targetDB.models.User ||
          targetDB.model("User", ProductUserSchema);

        const hashedPassword = await bcrypt.hash(body.password, 12);

        let tenantId = "69f07229f7ea9a484075c23f";

        const isSuperAdminSoftware =
          (body.softwareName === "CyberPharma" ||
            body.softwareName === "CyberClinic") &&
          body.plan !== "Basic";

        let role = isSuperAdminSoftware ? "super_admin" : "admin";

        if (body.softwareName === "CyberPayroll" && body.plan === "Basic") {
          role = "hr";
        }

        if (body.softwareName === "CyberDine" && body.plan === "Basic") {
          role = "manager";
        }
        const branchName = `BRANCH-${Math.random()
  .toString(36)
  .substring(2, 8)
  .toUpperCase()}`;

        await ProductUser.create({
          name: body.name,
          email: body.email,
          password: hashedPassword,
          passwordHash: hashedPassword,
          role: role,
          phone: body.phone,
          tenantId: tenantId,
          branchName: branchName,
          branch:branchName,
          softwareName: body.softwareName,
          plan: body.plan,
          contractStartDate: body.contractStartDate,
          contractEndDate: body.contractEndDate,
        });
      }
    }

    console.log("hello");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: body.email,
      subject: `Welcome to ${body.softwareName}`,
      html: `
        <h2>Hello ${body.name}</h2>
        <p>Your account has been created successfully.</p>
        <table border="1" cellpadding="8" cellspacing="0">
          <tr>
            <td><strong>Software</strong></td>
            <td>${body.softwareName}</td>
          </tr>
          <tr>
            <td><strong>Email</strong></td>
            <td>${body.email}</td>
          </tr>
          <tr>
            <td><strong>Password</strong></td>
            <td>${body.password}</td>
          </tr>
          <tr>
            <td><strong>Plan</strong></td>
            <td>${body.plan}</td>
          </tr>
          <tr>
            <td><strong>Tenure</strong></td>
            <td>${body.tenure}</td>
          </tr>
        </table>
        <br/>
        <p>Thank you for choosing ${body.softwareName}.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      client,
      message: "Client added successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const clients = await SoftwareClient.find().sort({ createdAt: -1 });

    const now = new Date();

    const currentWeek = new Date();
    currentWeek.setDate(now.getDate() - 7);

    const previousWeek = new Date();
    previousWeek.setDate(now.getDate() - 14);

    const currentWeekClients = clients.filter(
      (c) => new Date(c.createdAt) >= currentWeek
    );

    const previousWeekClients = clients.filter(
      (c) =>
        new Date(c.createdAt) >= previousWeek &&
        new Date(c.createdAt) < currentWeek
    );

    const totalOrders = clients.length;

    const basicOrders = clients.filter((c) => c.plan === "Basic").length;
    const businessOrders = clients.filter((c) => c.plan === "Business").length;
    const enterpriseOrders = clients.filter((c) => c.plan === "Enterprise").length;

    const currentOrders = currentWeekClients.length;
    const previousOrders = previousWeekClients.length;

    const orderGrowth =
      previousOrders === 0
        ? 100
        : (((currentOrders - previousOrders) / previousOrders) * 100).toFixed(1);

    const currentBasic = currentWeekClients.filter((c) => c.plan === "Basic").length;
    const previousBasic = previousWeekClients.filter((c) => c.plan === "Basic").length;

    const basicGrowth =
      previousBasic === 0
        ? 100
        : (((currentBasic - previousBasic) / previousBasic) * 100).toFixed(1);

    const currentBusiness = currentWeekClients.filter((c) => c.plan === "Business").length;
    const previousBusiness = previousWeekClients.filter((c) => c.plan === "Business").length;

    const businessGrowth =
      previousBusiness === 0
        ? 100
        : (((currentBusiness - previousBusiness) / previousBusiness) * 100).toFixed(1);

    const currentEnterprise = currentWeekClients.filter((c) => c.plan === "Enterprise").length;
    const previousEnterprise = previousWeekClients.filter((c) => c.plan === "Enterprise").length;

    const enterpriseGrowth =
      previousEnterprise === 0
        ? 100
        : (((currentEnterprise - previousEnterprise) / previousEnterprise) * 100).toFixed(1);

    return NextResponse.json({
      success: true,
      clients,
      totalOrders,
      basicOrders,
      businessOrders,
      enterpriseOrders,
      orderGrowth,
      basicGrowth,
      businessGrowth,
      enterpriseGrowth,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
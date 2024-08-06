// "use client";
import { db } from "../../utils/index";
import { userInfo } from "../../utils/schema";
import { eq } from "drizzle-orm";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import FormContent from "../../components/admin/FormContent";
import MobilePreview from "../../components/admin/MobilePreview";

async function Admin() {
  const { userId } = auth();
  const getUser = await db
    .select()
    .from(userInfo)
    .where(eq(userInfo.userId, userId));
  if (getUser.length == 0) {
    redirect("/create");
  }
  return (
    <div className="p-5">
    <div className="grid grid-cols-1  lg:grid-cols-3">
      <div className="col-span-2">
        <FormContent />
      </div>
      <div>
        <MobilePreview />
      </div>
    </div>
    </div>
  );
}

export default Admin;

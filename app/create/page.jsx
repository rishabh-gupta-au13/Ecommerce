import Create from "../../components/create/Create";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { eq } from 'drizzle-orm';
import { db } from "../../utils/index";
import { userInfo } from "../../utils/schema";
 async function CreateUserName() {
  const { userId } = auth();
  const getUser=await db.select().from(userInfo).where(eq(userInfo.userId,userId));
  if (getUser.length>0) {
    redirect("/admin");
  }
  return <Create userId={userId}/>;
}

export default CreateUserName;

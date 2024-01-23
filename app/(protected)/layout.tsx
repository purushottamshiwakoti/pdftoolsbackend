import { Sidebar } from "@/components/common/Sidebar";
import { Navbar } from "@/components/common/navbar";



const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex min-h-[100%] h-auto  w-[100%] bg-gradient-to-r from-violet-200 to-pink-200">
        <div className=" mr-5">
          <Sidebar />
        </div>
        <div className="flex flex-col w-[100%] ml-[250px]">
          <Navbar />
          <div className="mt-20">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

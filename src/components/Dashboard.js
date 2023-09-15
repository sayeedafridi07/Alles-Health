import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { MdOutlineLocalHospital } from "react-icons/md";
import { useEffect } from "react";

export default function Dashboard() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const feturedItems = [
    {
      title: "Family Tree",
      image: "Family_Tree.png",
    },
    {
      title: "Health Journey",
      image: "Health_Journey.png",
    },
    {
      title: "Health Rewards",
      image: "Health_Rewards.png",
    },
  ];

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="bg-slate-800 text-white rounded-md p-3 px-6 text-center w-fit">
        <h1 className="text-lg font-semibold">
          Hello, {user?.firstName} {""} {user?.lastName}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {feturedItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between gap-5 bg-gray-100 rounded-md shadow-md p-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="rounded-full w-20 h-20"
            />
            <p className="text-xl font-semibold">{item.title}</p>
          </div>
        ))}
      </div>
      <FamilyMembers />
      <Checker />
    </>
  );
}

const FamilyMembers = () => {
  return (
    <div className="flex flex-col">
      <span className="text-lg font-semibold mb-5">Your Family Members</span>
      <button className="border-dashed border-2 border-blue-400 rounded-full w-fit p-5">
        <AiOutlinePlus fontSize={24} className="text-blue-400" />
      </button>
      <span className="text-sm text-gray-400 mt-2">Add New</span>
    </div>
  );
};

const Checker = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <img
          src="Symtoms_Checker.png"
          alt="symtoms checker"
          className="w-full h-28 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-blue-100 rounded-md p-5 flex flex-row items-center justify-center gap-2">
          <BiCalendar fontSize={24} className="text-blue-400" />
          <span className="text-lg text-blue-400 font-semibold">
            Make Your Calendar
          </span>
        </div>
        <div className="bg-blue-100 rounded-md p-5 flex flex-row items-center justify-center gap-2">
          <MdOutlineLocalHospital fontSize={24} className="text-blue-400" />
          <span className="text-lg text-blue-400 font-semibold">
            Dosage Information
          </span>
        </div>
      </div>
    </div>
  );
};

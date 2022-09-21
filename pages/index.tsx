import { useUser } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Table from "../components/table";
import { projects } from "../constants/index";
import { classNames } from "../constants/index";

const Home: NextPage = () => {
  const [name ,setName]=useState<string>("")
  const {user}=useUser()
  useEffect(()=>{
    console.log(user)
  },[])
  return (
    <Layout>
      <div className="container mx-auto sm:px-6 lg:px-8 bg-zinc-100	py-10	">
        <div className="bg-white py-6 px-10 flex justify-between items-center">
          <div className="flex items-center">
            <img
              className="inline-block h-14 w-14 rounded-full "
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <div className="p-2">
              <h2
                className="text-xl	font-bold"
              >
                Good morning, Your Name
              </h2>
              <span>🔥10 Day Streak</span>
            </div>
          </div>
          <div className="space-x-2">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Browse workouts
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Start today&apos;s workout
            </button>
          </div>
        </div>
        <div className="py-6 px-10">
          <div>Personal Records 🏆</div>

          <ul
            role="list"
            className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
          >
            {projects.map((project) => (
              <li
                key={project.name}
                className={classNames(
                  `${project.bgColor} col-span-1 flex rounded-xl shadow-sm `
                )}
              >
                <div className="flex flex-1 items-center justify-between truncate rounded-xl border-t border-r border-b py-5">
                  <div className="flex-1 truncate px-6 py-2 text-sm">
                    <div className="font-medium text-white">{project.name}</div>
                    <p className="text-white text-lg font-bold">
                      {project.lbs} lbs
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="py-6 px-10">today&apos;s workout (Leg Day)</div>
        </div>
        <div className="px-4 relative sm:px-6 lg:px-8 ">
          <div className=" flex mt-5 items-center">
            <span
              className="absolute top-5 left-15 ml-4 h-full w-0.5 bg-gray-200 handl"
              aria-hidden="true"
            ></span>
            <div className="z-10">
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Jumping jacks
              </p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                3 Sets x 20 Reps
              </p>
            </div>
          </div>
          <div className="container  sm:px-6 lg:px-8  border-l-slate-800 	">
            <Table />
          </div>
        </div>
        <div className=" relative px-4 sm:px-6 lg:px-8 ">
          <div className="flex mt-5 items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Air Squat
              </p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                2 Sets x 100 Reps
              </p>
            </div>
          </div>
          <div className="container mx-auto sm:px-6 lg:px-8 	">
            <Table />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

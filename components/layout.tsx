/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Bars3BottomLeftIcon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AppProps, MenuType } from "../types";
import { changeNavigationCurrent } from "../utils/functions";
import { classNames, navigation, userNavigation } from "../constants";

import { addPhoto, getUserProfile } from "../utils/apis";
import { useUser } from "@supabase/auth-helpers-react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/app/hookes";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

export default function Layout({ children }: AppProps) {
  const [menu, setMenu] = useState<MenuType[]>(navigation);
  const profile = useAppSelector((state) => state.user.profile);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [Router, setRouter] = useState<string>("");
  const router = useRouter();
  const { user, isLoading } = useUser();
  const dispatch = useDispatch();

  const getProfile = async () => {
    if (user !== null) {
      await getUserProfile(user.id as string, dispatch);
    } else {
      router.push("/signin");
    }
  };

  useEffect(() => {
    getProfile();
    setRouter(router.asPath);
    changeNavigationCurrent(router.asPath, menu, setMenu);
  }, []);

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://vsehzqgmugndfzhsvknp.supabase.co/storage/v1/object/sign/images/170241003-d8362438-32bb-4b11-8471-479165fcb399.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvMTcwMjQxMDAzLWQ4MzYyNDM4LTMyYmItNGIxMS04NDcxLTQ3OTE2NWZjYjM5OS5wbmciLCJpYXQiOjE2NjY2MjAwNzQsImV4cCI6MTk4MTk4MDA3NH0.3wxxliDHdyUoe-cF6t6Ja38A24IpDFfKIQ2KjZPZP0s"
                    alt="logo"
                  />
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="space-y-1 px-2">
                    {menu.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            item.current
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                          onClick={() =>
                            changeNavigationCurrent(item.href, menu, setMenu)
                          }
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-4 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
          <div className="flex flex-shrink-0 items-center px-4">
            <img
              style={{ width: "150px" }}
              src="https://vsehzqgmugndfzhsvknp.supabase.co/storage/v1/object/sign/images/170241003-d8362438-32bb-4b11-8471-479165fcb399.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvMTcwMjQxMDAzLWQ4MzYyNDM4LTMyYmItNGIxMS04NDcxLTQ3OTE2NWZjYjM5OS5wbmciLCJpYXQiOjE2NjY2MjAwNzQsImV4cCI6MTk4MTk4MDA3NH0.3wxxliDHdyUoe-cF6t6Ja38A24IpDFfKIQ2KjZPZP0s"
              alt="logo"
            />
          </div>
          <div className="mt-5 flex flex-grow flex-col">
            <nav className="flex-1 space-y-1 px-2 pb-4">
              {menu.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                    onClick={() =>
                      changeNavigationCurrent(item.href, menu, setMenu)
                    }
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col md:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-end px-4">
            <div className="ml-4 flex items-center md:ml-6">
              <h1 className="font-bold">{profile.firstName}</h1>
              <button
                type="button"
                className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={`${
                        profile?.imageUrl
                          ? profile.imageUrl
                          : "https://vsehzqgmugndfzhsvknp.supabase.co/storage/v1/object/sign/images/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvMzYwX0ZfMzQ2ODM5NjgzXzZuQVB6YmhwU2tJcGI4cG1Bd3Vma0M3YzVlRDd3WXdzLmpwZyIsImlhdCI6MTY2NjYyMTUzOCwiZXhwIjoxOTgxOTgxNTM4fQ.yqrGRk7JGCuzW0KPIObHaPKKmKrijkSih7KzN406SYM"
                      }`}
                      alt="Profile"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div>
                      <div>
                        <div className="flex justify-center items-center w-full">
                          <label
                            htmlFor="pic"
                            className=" flex flex-col  w-full   rounded-lg   cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <span className=" px-4 py-2 text-sm text-gray-700 dark:text-gray-400">
                              Upload Photo
                            </span>

                            <input
                              className="hidden"
                              id="pic"
                              type="file"
                              accept=".jpg,.png"
                              onChange={async (e) => {
                                console.log(e.target);
                                console.log(user?.id);

                                if (e.target.files !== null) {
                                  await addPhoto(
                                    user?.id!,
                                    e.target.files[0],
                                    dispatch
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <Menu.Item>
                      {({ active }) => (
                        <p
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700 cursor-pointer",
                            "hover:bg-gray-100"
                          )}
                          onClick={async () => {
                            await supabaseClient.auth.signOut();
                          }}
                        >
                          Sign out
                        </p>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

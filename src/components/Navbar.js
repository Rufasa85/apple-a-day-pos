import { Link, useLocation } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { api, LogoutButton } from "../components";
import { BouncingApple } from "../components";
import { classCondition } from "../utils";

export default function Navbar({ userId, logout }) {
  const { pathname } = useLocation();

  const navigation = [
    { name: "Menu", href: "/new-shift" },
    { name: "Service", href: "/service" },
    { name: "Reports", href: "/reports" },
  ];

  return (
    <Disclosure
      as="nav"
      className="box-border bg-gray-300 shadow-lg shadow-gray-300/50"
    >
      {({ open }) => (
        <>
          <div className="px-8 py-6 grid grid-cols-3 items-center relative mx-auto">
            <div className="px-3 flex">
              <h1 className="text-4xl drop-shadow-xl flex justify-center items-center">
                🍎
              </h1>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="flex items-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="gap-2 flex justify-center items-center">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classCondition(
                          item.href === pathname
                            ? "bg-gray-800 text-white"
                            : "hover:bg-gray-200",
                          "lg:w-36 w-24 rounded-md px-4 py-2 font-medium flex justify-center items-center"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {userId !== 0 ? (
              <div className="hidden sm:flex justify-end">
                <LogoutButton className=" hover:bg-gray-200 rounded-md px-3 py-2 text-base font-medium" logout={logout}/>
              </div>
            ) : (
              <div className="sm:hidden md:flex">
                <Link to="/login">Login</Link>
              </div>
            )}

            <div className="flex justify-end sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-1 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="grid grid-flow-row px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  // as="a"
                  to={item.href}
                  className={classCondition(
                    item.href === pathname
                      ? "bg-gray-800 text-white"
                      : "hover:bg-gray-200",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}

              <hr className="my-2 h-px w-full bg-gray-800/20 flex border-0 sm:hidden" />

              {userId !== 0 ? (
                <div className="sm:hidden flex">
                  <LogoutButton className=" hover:bg-gray-200 rounded-md px-3 py-2 text-base font-medium" />
                </div>
              ) : (
                <div className="sm:hidden flex">
                  <Link to="/login">Login</Link>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

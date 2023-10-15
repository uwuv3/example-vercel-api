import React, { useEffect } from "react";
import { Transition } from "@headlessui/react";
import { useToast } from "@hanseo0507/react-toast";
import Link from "next/link";
import Image from "next/image";
const urls = [
  {
    title: "random/dog",
    desc: `image/jpeg verisinde rastgele köpek atar`,
    href: `/api/random/dog`,
    image: `/api/random/dog`,
  },
  {
    title: "random/cat",
    desc: `image/jpeg verisinde rastgele kedi atar`,
    href: `/api/random/cat`,
    image: `/api/random/cat`,
  },
  {
    title: "random/image",
    desc: `image/jpeg verisinde rastgele resim atar`,
    href: `/api/random/image`,
    image: `/api/random/image`,
  },
  {
    title: "random/emoji",
    desc: `JSON verisinde rastgele emoji(ler) atar`,
    href: `/api/random/emoji?size=4&getRandom=true`,
  },  {
    title: "minecraft/server-info",
    desc: `JSON verisinde rastgele emoji(ler) atar`,
    href: `/api/minecraft/server-info?ip=oyna.craftrise.tc`,
  },
];
export default function Home() {
  const [loaded, setLoaded] = React.useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setLoaded(false);

    setInterval(() => {
      setLoaded(true);
    }, 1000);
  }, []);
  return (
    <>
      <Transition
        as={React.Fragment}
        show={!loaded}
        enter="transform transition duration-[5ms]"
        enterFrom="opacity-0 translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leave="transform duration-0 transition ease-in-out"
        leaveFrom="opacity-0"
        leaveTo="opacity-0"
      >
        <div>
          {" "}
          <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center ">
              {Array.from({ length: 6 }).map((value, index) => (
                <div
                  key={index}
                  className="sm:w-full md:w-full p-5 h-[300px] w-[280px] rounded-lg  bg-gray-300 dark:bg-[#080808] dark:hover:bg-[#101010] hover:-translate-y-[8px] transition-all duration-200"
                >
                  <div className="w-full relative rounded-lg overflow-hidden h-[130px] w-30 animate-pulse">
                    <div className="w-[1024px] h-[512px] bg-slate-700 rounded col-span-2" />
                  </div>
                  <div className="w-full pt-2 flex items-center animate-pulse">
                    <h1 className="text-3xl font-bold text-white">
                      <div className="h-5 w-28 bg-slate-700 rounded col-span-2" />
                    </h1>
                  </div>
                  <div className="text-md font-normal text-white/50 h-24 animate-pulse">
                    <div className="space-y-2 py-2">
                      <div className="grid grid-cols-3 w-[100px] gap-4">
                        <div className="h-4 w-[120px] bg-slate-700 rounded col-span-2" />
                        <div className="h-4 w-[90px] bg-slate-700 rounded col-span-1" />
                      </div>
                      <div className="grid grid-cols-3 w-[70px]  gap-4">
                        <div className="h-4 w-[50px] bg-slate-700 rounded col-span-2" />
                        <div className="h-4 w-[100px] bg-slate-700 rounded col-span-1" />
                      </div>
                      <div className="grid grid-cols-3 w-[100px] gap-4">
                        <div className="h-4 w-[100px] bg-slate-700 rounded col-span-2" />
                        <div className="h-4 w-[80px] bg-slate-700 rounded col-span-1" />
                      </div>
                      <div className="grid grid-cols-3 w-[130px]  gap-4">
                        <div className="h-4 w-[90px] bg-slate-700 rounded col-span-2" />
                        <div className="h-4 w-[90px] bg-slate-700 rounded col-span-1" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Transition>
      <Transition
        as={React.Fragment}
        show={loaded}
        enter="transform transition duration-[500ms]"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transform duration-0 transition ease-in-out"
        leaveFrom="opacity-0"
        leaveTo="opacity-0"
      >
        <div>
          {" "}
          <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center ">
              {urls.map((value, index) => (
                <a
                  key={index}
                  href={value.href}
                  className="sm:w-full md:w-full p-5 h-[300px] w-[280px] rounded-lg  bg-gray-300 dark:bg-[#080808] dark:hover:bg-[#101010] hover:-translate-y-[8px] transition-all duration-200"
                >
                  {value?.image ? (
                    <>
                      <div className="w-full relative rounded-lg overflow-hidden h-[130px] w-30">
                        <Image
                          src={value?.image}
                          width={1024}
                          height={512}
                          className="rounded-lg"
                        ></Image>
                      </div>
                    </>
                  ) : (
                    <div className="w-full relative rounded-lg overflow-hidden h-[130px] w-30 animate-pulse">
                      <div className="w-[1024px] h-[512px] bg-slate-700 rounded col-span-2" />{" "}
                    </div>
                  )}
                  {value?.title ? (
                    <>
                      <div className="w-full pt-2 flex items-center">
                        <h1 className="text-3xl font-bold text-black dark:text-white">
                          {value?.title}
                        </h1>
                      </div>
                    </>
                  ) : (
                    <div className="w-full pt-2 flex items-center animate-pulse">
                      <h1 className="text-3xl font-bold text-white">
                        <div className="h-5 w-28 bg-slate-700 rounded col-span-2" />
                      </h1>
                    </div>
                  )}
                  {value?.desc ? (
                    <>
                      <div
                        className="text-md font-normal text-black dark:text-white/50 h-24 overflow-small"
                        style={{ overflow: "auto" }}
                      >
                        {value?.desc}
                      </div>
                    </>
                  ) : (
                    <div className="text-md font-normal text-white/50 h-24 animate-pulse">
                      <div className="space-y-2 py-2">
                        <div className="grid grid-cols-3 w-[100px] gap-4">
                          <div className="h-4 w-[120px] bg-slate-700 rounded col-span-2" />
                          <div className="h-4 w-[90px] bg-slate-700 rounded col-span-1" />
                        </div>
                        <div className="grid grid-cols-3 w-[70px]  gap-4">
                          <div className="h-4 w-[50px] bg-slate-700 rounded col-span-2" />
                          <div className="h-4 w-[100px] bg-slate-700 rounded col-span-1" />
                        </div>
                        <div className="grid grid-cols-3 w-[100px] gap-4">
                          <div className="h-4 w-[100px] bg-slate-700 rounded col-span-2" />
                          <div className="h-4 w-[80px] bg-slate-700 rounded col-span-1" />
                        </div>
                        <div className="grid grid-cols-3 w-[130px]  gap-4">
                          <div className="h-4 w-[90px] bg-slate-700 rounded col-span-2" />
                          <div className="h-4 w-[90px] bg-slate-700 rounded col-span-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

import React, { useEffect } from "react";
import { Transition } from "@headlessui/react";
import { useToast } from "@hanseo0507/react-toast";
import Link from "next/link";

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
          <div id="hero" className="p-10 animate-pulse">
            <div>
              <div className="flex justify-center items-center">
                <h1 className="font-bold text-2xl md:text-5xl tracking-tight ms-2 text-black dark:text-white">
                  <div className=" h-6 w-[220px] h-[35px] bg-slate-700 rounded" />
                </h1>
              </div>

              <br />
              <div className="grid w-[140px]  gap-4">
                <div className="col-span-5" />
                <div className="h-4 w-[150px] bg-slate-700 rounded col-span-1" />
                <div className="h-4 w-[130px] bg-slate-700 rounded col-span-1" />
                <div className="h-4 w-[50px] bg-slate-700 rounded col-span-1" />
                <div className="h-4 w-[190px] bg-slate-700 rounded col-span-1" />
                <div className="h-4 w-[100px] bg-slate-700 rounded col-span-1" />
              </div>
              <div className="grid w-[140px]  gap-4">
                <div className="col-span-5" />
                <div className="h-4 w-[120px] bg-slate-700 rounded col-span-1" />
                <div className="h-4 w-[160px] bg-slate-700 rounded col-span-1" />
                <div className="h-4 w-[40px] bg-slate-700 rounded col-span-1" />
                <div className="h-4 w-[120px] bg-slate-700 rounded col-span-1" />
                <div className="h-4 w-[110px] bg-slate-700 rounded col-span-1" />
              </div>
              <div className="grid w-[140px]  gap-4">
                <div className="col-span-5" />
                <div className="h-4 w-[130px] bg-slate-700 rounded col-span-1" />
                <div className="h-4 w-[190px] bg-slate-700 rounded col-span-1" />
                <div className="h-4 w-[50px] bg-slate-700 rounded col-span-1" />
                <div className="h-4 w-[120px] bg-slate-700 rounded col-span-1" />
                <div className="h-4 w-[110px] bg-slate-700 rounded col-span-1" />
              </div>
              <div className="grid w-[140px]  gap-4">
                <div className="col-span-5" />
                <div className="h-4 w-[120px] bg-slate-700 rounded col-span-1" />
                <div className="h-4 w-[160px] bg-slate-700 rounded col-span-1" />
                <div className="h-4 w-[40px] bg-slate-700 rounded col-span-1" />
                <div className="h-4 w-[120px] bg-slate-700 rounded col-span-1" />
                <div className="h-4 w-[110px] bg-slate-700 rounded col-span-1" />
              </div>
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
          <div id="hero" className="p-10">
            <div className="flex justify-center items-center">
              <h1 className="font-bold text-2xl md:text-5xl tracking-tight ms-2 animated-text hover:scale-105 duration-75">
                uwuv3 API
              </h1>
            </div>
            <br />
            <div className="flex justify-center items-center">
              <h1 className="ont-bold text-2xl md:text-5xl tracking-tight ms-2  animated-text2 hover:scale-105 duration-75">
                Çok yakında sizlerle
              </h1>
            </div>
            <br />

            <h2 className="text-lg leading-7 text-black dark:text-white">
              Bu site test sitesidir,üzerinize alınmayın
            </h2>
            <p className="text-lg leading-7 text-black dark:text-white"></p>
            <p className="text-lg leading-7 text-black dark:text-white"></p>
          </div>
        </div>
      </Transition>
    </>
  );
}

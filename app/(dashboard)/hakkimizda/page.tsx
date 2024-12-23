import { Separator } from "@/components/ui/separator";

import React from "react";

const AboutPage = () => {
  return (
    <div className="flex flex-col p-3">
      <h1 className="text-[40px] font-black text-neutral-600 ">Hakkımızda</h1>
      <Separator />
      <p className="mt-5 w-2/3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus nulla
        autem sequi doloremque? Quo molestiae non quam repellat necessitatibus
        doloremque sunt id repellendus voluptate ea dolorem temporibus incidunt
        voluptatibus libero sit totam fuga ullam earum corporis, rerum
        cupiditate rem. <br />
        <br />
        At quod architecto sunt placeat sint voluptatibus illo velit deserunt
        delectus? Ipsum explicabo labore molestiae quae dolore voluptates harum
        natus vero consequuntur deserunt quam facilis rerum adipisci id impedit,
        beatae fuga dignissimos quas! Esse praesentium cupiditate voluptas,
        aliquam repellendus dolorum inventore delectus culpa quis libero
        perferendis neque ullam qui consequatur sequi maiores sapiente
        molestias, tempore ipsam deleniti rerum possimus. Corrupti, doloribus?
      </p>
    </div>
  );
};

export default AboutPage;

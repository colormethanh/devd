import React, { useState } from "react";

export default function TaskDetailPanel({ task }) {
  return (
    <div className="border-l h-full w-full">
      <div className=" mx-3 h-full flex flex-col justify-around">
        <div className="w-full flex flex-col">
          <h1 className="text-4xl"> Task name </h1>
          <hr className="my-2"></hr>
          <div className="flex flex-col w-1/2 sm:flex-row sm:w-full">
            <div className="mr-3">
              <select
                id="status"
                name="status"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs text-xs"
              >
                <option>Backlog</option>
                <option>In progress</option>
                <option>Done</option>
              </select>
            </div>
            <div className="border-l border-white mr-3"></div>
            <div className="mr-3 ">
              <div className="flex flex-col sm:flex-row">
                <h5 className="text-s"> Complete By:</h5>
                <input className="text-black sm:ml-3" type="date" />{" "}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h5 className="text-xl font-bold">Description:</h5>
          <div className="max-h-28 w-1/2 sm:w-full overflow-auto">
            <p className="text-lg ms-3 overflow-auto">
              {
                "ldfad sfdsfasd fdsafdsfsdafsad fdsafsdafsdaf asdfsadsadf asdfasdfasdkjfgdsl;kfj;lsdakf;lkasdl;fk;lsdkaf;lkasd;lfk skdl;fkas';flkas;"
              }
            </p>
          </div>
        </div>

        <div className="flex flex-col h-2/5">
          <h5 className="text-xl font-bold"> Relevant contents:</h5>
          <div className="w-1/3 h-full border overflow-auto border-white">
            <p> Blah </p>
            <p> Blah </p>
            <p> Blah </p>
            <p> Blah </p>
          </div>
        </div>
      </div>
    </div>
  );
}

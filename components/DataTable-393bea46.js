import React from "react";
export default function Table({ id, data }) {
  return (
    <div className="mid-table-wrapper">
      <table className="table table-hover mid-table">
        <thead>
          <tr>
            {data[0].map((c, i) => {
              if (i === 0) {
                return (
                  <th scope="col" key={`${id}-th_` + i}>
                    {c}
                  </th>
                );
              } else {
                return (
                  <th scope="col" key={`${id}-th_` + i}>
                    {c}
                  </th>
                );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((r, ii) => (
            <tr key={`${id}-tr_` + ii}>
              {r.map((v, iii) => {
                if (iii === 0) {
                  return (
                    <th scope="row" key={`${id}-r-th_` + iii}>
                      {v}
                    </th>
                  );
                } else {
                  return <td key={`${id}-r-td_` + iii}>{v}</td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

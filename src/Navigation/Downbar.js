import React from "react";
import '../CSS/ListSubmissions.css';

const Downbar = () => {
  return (
      <div>
          <br></br>
            <table align="center" width={"95%"} cellSpacing="0" cellPadding={"4"}>
                <tbody>
                <tr>
                    <td  bgcolor="#0000000"></td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <table align="center">
                <tbody>
                    <tr>
                        <td align="center">
                        <a className="downtext" href="https://www.ycombinator.com/apply/">
                    Applications are open for YC Summer 2022
                    </a>
                        </td>
                    </tr>
                </tbody>
            </table>
      <br></br>
      <br></br>
      </div>
    
  )
}

export default Downbar;
import React from "react";
import InfoCard from "../../components/Cards/InfoCard";
import PageTitle from "../../components/Typography/PageTitle";
import { MoneyIcon, PeopleIcon } from "../../icons";
import RoundIcon from "../../components/RoundIcon";

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableFooter
} from "@windmill/react-ui";


function Dashboard() {

  // MOVE TO DB:
  const eventData = [{
    name: "Bob Burns",
    entries: [
      {
        name: "Matthew Webb",
        gradeNo: "225527D",
        grade: "247",
      },
      {
        name: "Peter Shaw",
        gradeNo: "166609F",
        grade: "2172",
      },
      {
        name: "Mike Walker",
        gradeNo: "142953L",
        grade: "2073",
      },
      {
        name: "David Barlow",
        gradeNo: "106225G",
        grade: "2005",
      },
      {
        name: "Gary Corcoran",
        gradeNo: "258651E",
        grade: "1878",
      },
      {
        name: "John Holliday",
        gradeNo: "180699D",
        grade: "1713",
      },
      {
        name: "Gawain Ako",
        gradeNo: "265438G",
        grade: "161",
      }
    ]
  },
  {
    name: "May Rapidplay",
    entries: [
      {
        name: "Peter Shaw",
        gradeNo: "166609F",
        grade: "2172",
      },
      {
        name: "Andrew Wainwright",
        gradeNo: "185834J",
        grade: "2013",
      },
      {
        name: "David Barlow",
        gradeNo: "106225G",
        grade: "2005",
      },
      {
        name: "Max Shaw",
        gradeNo: "312992F",
        grade: "2000*",
      },
      {
        name: "Chris Wright",
        gradeNo: "214108F",
        grade: "1968",
      },
      {
        name: "Sam Davies",
        gradeNo: "289559G",
        grade: "1908",
      },
      {
        name: "Gary Corcoran",
        gradeNo: "258651E",
        grade: "1878",
      },
      {
        name: "John Holliday",
        gradeNo: "180699D",
        grade: "1713",
      },
      {
        name: "Tony Youngs",
        gradeNo: "",
        grade: "",
      },
      {
        name: "Steven Law",
        gradeNo: "",
        grade: "Ungraded",
      }
    ]
  },
  {
    name: "May Congress",
    entries: [
      {
        name: "Peter Shaw",
        gradeNo: "166609F",
        grade: "2172",
      },
      {
        name: "Andrew Wainwright",
        gradeNo: "185834J",
        grade: "2013",
      },
      {
        name: "David Barlow",
        gradeNo: "106225G",
        grade: "2005",
      },
      {
        name: "Max Shaw",
        gradeNo: "312992F",
        grade: "2000*",
      },
      {
        name: "Sam Davies",
        gradeNo: "289559G",
        grade: "1908",
      },
      {
        name: "Gary Corcoran",
        gradeNo: "258651E",
        grade: "1878",
      },
      {
        name: "Gawain Ako",
        gradeNo: "265438G",
        grade: "161",
      },
      {
        name: "Gawain Ako",
        gradeNo: "265438G",
        grade: "161",
      },
      {
        name: "Bob Gaunt",
        gradeNo: "",
        grade: "Ungraded",
      },
      {
        name: "Steven Law",
        gradeNo: "",
        grade: "Ungraded",
      },
      {
        name: "Jacob Smith",
        gradeNo: "",
        grade: "Ungraded",
      }
    ]
  }]

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      <div className="grid md:grid-cols-2">
        <div className="px-2">
          <h2>Bob Burns</h2>
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Name</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>ECF No.</TableCell>
                  <TableCell>Grade</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {
                  eventData[0].entries.map(p => {
                    return (<tr>
                      <TableCell>{p.name}</TableCell>
                      <TableCell></TableCell>
                      <TableCell>{p.gradeNo}</TableCell>
                      <TableCell>{p.grade}</TableCell>
                    </tr>)
                  })
                }

              </TableBody>
            </Table>
            <TableFooter>
            </TableFooter>
          </TableContainer>
        </div>
        <div>
          <h2>May Rapidplay</h2>
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Name</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>ECF No.</TableCell>
                  <TableCell>Grade</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {
                  eventData[1].entries.map(p => {
                    return (<tr>
                      <TableCell>{p.name}</TableCell>
                      <TableCell></TableCell>
                      <TableCell>{p.gradeNo}</TableCell>
                      <TableCell>{p.grade}</TableCell>
                    </tr>)
                  })
                }

              </TableBody>
            </Table>
            <TableFooter>
            </TableFooter>
          </TableContainer>
        </div>
        <div className="px-2">
          <h2>May Congress</h2>
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Name</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>ECF No.</TableCell>
                  <TableCell>Grade</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {
                  eventData[2].entries.map(p => {
                    return (<tr>
                      <TableCell>{p.name}</TableCell>
                      <TableCell></TableCell>
                      <TableCell>{p.gradeNo}</TableCell>
                      <TableCell>{p.grade}</TableCell>
                    </tr>)
                  })
                }

              </TableBody>
            </Table>
            <TableFooter>
            </TableFooter>
          </TableContainer>
        </div>
      </div>
    </>
  )
}

export default Dashboard;

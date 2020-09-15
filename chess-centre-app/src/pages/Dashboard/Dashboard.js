import React from 'react'

import InfoCard from '../../components/Cards/InfoCard'
import PageTitle from '../../components/Typography/PageTitle'
import { MoneyIcon, PeopleIcon } from '../../icons'
import RoundIcon from '../../components/RoundIcon'

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableFooter
} from '@windmill/react-ui'


function Dashboard() {

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Members" value="207">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Prize Fund" value="£ 460.00">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Event</TableCell>
              <TableCell>Entries</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
          </TableBody>
        </Table>
        <TableFooter>
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default Dashboard

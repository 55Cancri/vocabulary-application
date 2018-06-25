import React, { Component } from 'react'
import Textbar from './Textbar'
import TopicsList from './TopicsList'
import moment from 'moment'
import numeral from 'numeral'

export const DashboardPage = props => (
  <div className="dashboard-page">
    <Textbar />
    <TopicsList />
  </div>
)

export default DashboardPage

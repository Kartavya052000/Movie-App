import { View, Text } from 'react-native'
import React from 'react'
import Movie from '../containers/Movie'

export default function MoreScreen({navigation,route}) {
  return (
    <Movie navigation={navigation} route={route} />
  )
}
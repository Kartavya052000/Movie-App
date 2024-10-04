import { View, Text } from 'react-native'
import React from 'react'
import Movies from '../containers/Movies'
import CustomTabView from '../tabs/tabs'

export default function IndexScreen({navigation}) {
  return (
    <CustomTabView navigation={navigation} />
  )
}
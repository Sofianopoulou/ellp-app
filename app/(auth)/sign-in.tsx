import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import images from '@/assets/images'

const SignIn = () => {
  return (
    <SafeAreaView className = "bg-cardBg h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4">
        <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[115px] self-center"/>
        <Text className="text-2xl text-center color-text text-bold mt-4">Sign in</Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
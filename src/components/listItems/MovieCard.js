import { Box, Button, ButtonText, Card, Heading, HStack, Image, Text, VStack } from '@gluestack-ui/themed'

const MovieCard = props => {
  const { title,popularity,release_date,poster_path,navigation ,id,type} = props
  // console.log(title)
  return (
    <Card p='$5' borderRadius='$lg' maxWidth={400} mb={10} >
        <HStack space="md">
        <Image
        mb='$3'
        h={120}
        // width=''
        borderRadius='$md'
        source={{ uri: `https://image.tmdb.org/t/p/w200${poster_path}` }}
alt="Image"
      />
        <VStack  >
        <Heading size='md' fontFamily='heading' mb='$2'>
            {title}
          </Heading>
          <Text mb='$1'>Popularity: {popularity}</Text>
          <Text mb='$1'>Release Date: {release_date}</Text>
          <Button
            variant='link'
            bg="#06b6d4"
            width="100%"
            onPress={() => {
              // Replace with your navigation logic
              navigation.navigate('More', { id,type });
            }}
            
            
          >
            <ButtonText style={{ color: '#ffffff' }}>More Details</ButtonText>
          </Button>
  
      </VStack>
        </HStack>
    
 
    
    </Card>
  )
}

export default MovieCard
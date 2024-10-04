import { FlatList } from '@gluestack-ui/themed'
import MovieCard from '../listItems/MovieCard'

const MoviesList = props => {
  const { navigation, content,type } = props
  return (
    <FlatList
      data={content}
      renderItem={({ item }) => (
        <MovieCard
          title={item.title?item.title:item.name}
          popularity={item.popularity}
          release_date={item.release_date}
          poster_path={item.poster_path}
          id={item.id}
          type={type?type:item.media_type}
          navigation={navigation}
        />
      )}
    />
  )
}

export default MoviesList
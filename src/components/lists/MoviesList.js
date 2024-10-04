import { FlatList } from '@gluestack-ui/themed'
import MovieCard from '../listItems/MovieCard'

const MoviesList = props => {
  const { navigation, content } = props
  return (
    <FlatList
      data={content}
      renderItem={({ item }) => (
        <MovieCard
          title={item.title}
          popularity={item.popularity}
          release_date={item.release_date}
          poster_path={item.poster_path}
          id={item.id}
          navigation={navigation}
        />
      )}
    />
  )
}

export default MoviesList
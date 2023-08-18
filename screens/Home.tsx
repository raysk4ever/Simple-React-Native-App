import React, {useCallback, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {usePosts} from '../hooks/usePosts';
import {TPost} from '../types';

function HeaderRightButton({onLogout, onRefresh = () => {}}: any) {
  return (
    <View style={styles.row}>
      <Text onPress={onRefresh}>🔁</Text>
      <Text onPress={onLogout}>👋</Text>
    </View>
  );
}

function HomeScreen({navigation}: any) {
  const {posts, fetchPosts, refreshPost, isLoading, refreshing, hasMore} =
    usePosts();

  const handleLogout = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'} as any],
    });
  }, [navigation]);
  const headerRight = useCallback(
    () => <HeaderRightButton onLogout={handleLogout} onRefresh={refreshPost} />,
    [refreshPost, handleLogout],
  );

  useEffect(() => {
    // Update header options with custom headerRight component
    navigation.setOptions({
      title: '🏠 Home',
      headerRight,
    });
  }, [headerRight, navigation]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const renderItem = ({item}: {item: TPost}) => {
    const onItemClicked = () => {
      navigation.navigate('Post', {...item});
    };
    return (
      <TouchableOpacity onPress={onItemClicked} style={styles.listItem}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.body}</Text>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    return !refreshing && isLoading ? (
      <ActivityIndicator size="large" style={styles.loader} />
    ) : null;
  };
  console.log('hasMore', hasMore);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item: TPost) => item.id.toString()}
        onEndReached={hasMore ? fetchPosts : undefined}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={refreshPost}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    elevation: 1,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 20,
  },
});

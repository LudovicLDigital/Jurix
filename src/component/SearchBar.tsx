import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type SearchBarProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onClear?: () => void;
};
const SearchBar = ({
  onSearch,
  placeholder,
  onBlur,
  onFocus,
  onClear,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      onSearch(query);
    },
    [onSearch],
  );

  const handleClear = useCallback(() => {
    setSearchQuery('');
    onClear && onClear();
  }, [onClear]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder ? placeholder : 'Rechercher...'}
        value={searchQuery}
        onChangeText={handleSearch}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <TouchableOpacity onPress={handleClear}>
        <Text style={styles.closeButton}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
  },
  input: {
    height: 60,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  closeButton: {
    fontSize: 20,
    color: 'gray',
    marginLeft: 10,
    position: 'absolute',
    right: 10,
    zIndex: 1,
    top: 20,
  },
});

export default SearchBar;

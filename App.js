import React, { useState } from 'react';
import { Provider as PaperProvider, Appbar, Banner } from 'react-native-paper';
import { NavigationContainer, DefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';

import BookListScreen from './screens/BookListScreen';
import AddBookScreen from './screens/AddBookScreen';
import BookCounter from './components/BookCounter'; // ajuste o path conforme sua estrutura

const Tab = createBottomTabNavigator();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [visibleBanner, setVisibleBanner] = useState(true);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
  const navigationTheme = isDarkTheme ? NavigationDarkTheme : DefaultTheme;

  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <NavigationContainer theme={navigationTheme}>
          <BookCounter />
          <Appbar.Header>
            <Appbar.Content title="Book Manager" />
            <Appbar.Action icon="theme-light-dark" onPress={toggleTheme} />
          </Appbar.Header>
          {visibleBanner && (
            <Banner
              visible={visibleBanner}
              actions={[
                {
                  label: 'Fechar',
                  onPress: () => setVisibleBanner(false),
                },
              ]}
              icon={({ size }) => (
                <Icon name="alert-circle-outline" size={size} />
              )}>
              Bem-vindo ao Book Manager! Adicione e gerencie suas tarefas facilmente.
            </Banner>
          )}
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Books') {
                  iconName = 'format-list-checks';
                } else if (route.name === 'Add') {
                  iconName = 'plus-circle';
                }
                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: isDarkTheme ? '#BB86FC' : '#6200EE',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Books" component={BookListScreen} options={{ title: "Livros" }} />
            <Tab.Screen name="Add" component={AddBookScreen} options={{ title: "Adicionar" }} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}
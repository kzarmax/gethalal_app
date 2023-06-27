import React from 'react';
import {StyleSheet} from 'react-native';
import SafeAreaView from '../containers/SafeAreaView';
import StatusBar from '../containers/StatusBar';
import DatePicker from '../containers/DateActionSheet';
import {withTheme} from '../theme';
import I18n from '../i18n';

class TestView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Test',
  });

  constructor(props) {
    super(props);
  }

  render() {
    const {theme} = this.props;
    return (
      <SafeAreaView>
        <StatusBar />
        <DatePicker onDone={() => {}} onCancel={() => {}} theme={theme} />
      </SafeAreaView>
    );
  }
}

export default withTheme(TestView);

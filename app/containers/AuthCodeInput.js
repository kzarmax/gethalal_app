import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {COLOR_PRIMARY_500} from '../constants/colors';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleInput: {
    fontSize: 18,
    lineHeight: 24,
    borderRadius: 12,
    width: 48,
    height: 56,
    borderWidth: 1,
    marginHorizontal: 4,
    textAlign: 'center',
    paddingVertical: 16,
    borderColor: COLOR_PRIMARY_500,
  },
});

const Numbers = 4;

const MoveType = {
  Forward: 1,
  Back: 2,
};

export default class AuthCodeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
    this.singleInputRef = [];
  }

  updateChangedChar = (index: number, char: string): void => {
    const temp = [...this.state.values];
    temp[index] = char;
    console.log('update chars', index, char, temp);
    this.setState({values: temp});
  };

  traverseInputs = (moveType, charPos): void => {
    console.log('refs', moveType, charPos);
    if (moveType === MoveType.Forward) {
      if (charPos >= 0 && charPos < Numbers - 1) {
        this.singleInputRef[charPos + 1].focus();
      } else if (charPos + 1 < Numbers - 1) {
        this.traverseInputs(MoveType.Forward, charPos + 1);
      }
    } else if (moveType === MoveType.Back) {
      if (charPos > 0 && charPos <= Numbers - 1) {
        this.singleInputRef[charPos - 1].focus();
      } else if (charPos - 1 > 0) {
        this.traverseInputs(MoveType.Back, charPos - 1);
      }
    }
  };

  onChange = (inputPos: number, char: string): void => {
    if (char.length === 1) {
      this.traverseInputs(MoveType.Forward, inputPos);
      this.updateChangedChar(inputPos, char);
    }
  };

  setInputRef = (inputPos: number, inputRef): void => {
    this.singleInputRef[inputPos] = inputRef;
  };

  onKeyPress = (inputPos: number, event: any, inputValue: string): void => {
    if (!inputValue) {
      return this.traverseInputs(MoveType.Back, inputPos); // user is trying to clear input so move back
    }
    if (event.key === 'Backspace') {
      if (inputPos === Numbers - 1) {
        if (inputValue.length === 0) {
          this.traverseInputs(MoveType.Back, inputPos);
        } else if (inputValue.length === 1) {
          this.updateChangedChar(inputPos, ''); // user is trying to clear last input
        }
      } else if (inputPos < Numbers - 1 && inputValue.length === 0) {
        this.traverseInputs(MoveType.Back, inputPos); // user is trying to clear input so move back
      } else {
        this.updateChangedChar(inputPos, ''); // user is trying to clear last input
      }
    }
  };

  clearInputOnFocus = (inputPos: number) => {
    this.singleInputRef[inputPos].clear();
    this.updateChangedChar(inputPos, '');
  };

  onSubmit = () => {
    const {values} = this.state;
    const codeStr = values.join('');
    this.props.onSubmit(codeStr);
  };

  renderNumbers = () => {
    const {values} = this.state;
    const {theme} = this.props;
    let numberFields = [];

    for (let i = 0; i < Numbers; i++) {
      numberFields.push(
        <TextInput
          defaultValue={values[i]}
          style={styles.singleInput}
          ref={ref => {
            this.singleInputRef[i] = ref;
          }}
          keyboardType="number"
          returnKeyType="next"
          onKeyPress={({nativeEvent}: any) =>
            this.onKeyPress(i, nativeEvent, values[i])
          }
          onChangeText={value => this.onChange(i, value)}
          clearTextOnFocus={() => this.clearInputOnFocus(i)}
          blurOnSubmit={i === Numbers - 1}
          onSubmitEditing={i === Numbers - 1 ? this.onSubmit : () => {}}
          maxLength={1}
          theme={theme}
        />,
      );
    }
    return numberFields;
  };

  render() {
    return <View style={styles.inputContainer}>{this.renderNumbers()}</View>;
  }
}

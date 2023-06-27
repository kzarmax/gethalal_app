/**
 * hosokawa
 * 2021/11/12
 */

import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {
  COLOR_GRAY_100,
  COLOR_GRAY_600,
  COLOR_GREEN_100,
  COLOR_PRIMARY_400,
  COLOR_PRIMARY_50,
  COLOR_PRIMARY_500,
  COLOR_WHITE,
  themes,
} from '../constants/colors';
import Button from './Button';
import I18n from '../i18n';
import {VectorIcon} from './VectorIcon';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import moment from 'moment';
import {date_str_format, DATE_STRING_DISPLAY_FORMAT} from '../utils/datetime';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  topHeader: {
    backgroundColor: COLOR_PRIMARY_500,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  yearText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    color: COLOR_WHITE,
  },
  dateText: {
    marginTop: 8,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
    color: COLOR_WHITE,
  },
  actionBtn: {
    marginHorizontal: 32,
  },
  separator: {
    marginVertical: 12,
    height: StyleSheet.hairlineWidth,
    color: '#F3F2F2',
  },
  cycles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  times: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  activeItemContainer: {
    padding: 14,
    borderRadius: 28,
    backgroundColor: COLOR_PRIMARY_500,
    marginRight: 16,
  },
  itemContainer: {
    padding: 14,
    borderRadius: 28,
    backgroundColor: COLOR_GRAY_100,
    marginRight: 16,
  },
  activeItemText: {
    color: COLOR_WHITE,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
  },
  itemText: {
    color: COLOR_GRAY_600,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
  },
  submitBtn: {
    marginLeft: 16,
  },
});

const DATE_ACTION_SHEET_HEIGHT = 520;

export default React.memo(
  ({
    sheetRef,
    defaultValue,
    defaultCycle,
    defaultTime,
    onDone,
    onCancel,
    theme,
  }) => {
    const [date, setDate] = useState(defaultValue ?? moment().add(2, 'days'));
    const [cycle, setCycle] = useState(defaultCycle ?? 0);
    const [time, setTime] = useState(defaultTime ?? 0);

    return (
      <BottomSheet
        draggable={true}
        hasDraggableIcon
        ref={sheetRef}
        sheetBackgroundColor={themes[theme].focusedBackground}
        height={DATE_ACTION_SHEET_HEIGHT}
      >
        <View style={styles.container}>
          <View style={styles.topHeader}>
            <Text style={styles.yearText}>{date_str_format(date, 'YYYY')}</Text>
            <Text style={styles.dateText}>
              {date_str_format(date, 'ddd, MMMM D')}
            </Text>
          </View>
          <CalendarPicker
            weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
            months={[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ]}
            previousComponent={
              <VectorIcon
                name={'chevron-left'}
                size={20}
                color={COLOR_PRIMARY_500}
                style={styles.actionBtn}
              />
            }
            nextComponent={
              <VectorIcon
                name={'chevron-right'}
                size={20}
                color={COLOR_PRIMARY_500}
                style={styles.actionBtn}
              />
            }
            selectedStartDate={date}
            minDate={moment().add(2, 'days')}
            todayBackgroundColor={COLOR_GREEN_100}
            selectedDayColor={COLOR_PRIMARY_500}
            selectedDayStyle={{backgroundColor: COLOR_PRIMARY_500}}
            selectedDayTextColor={COLOR_WHITE}
            dayLabelsWrapper={{borderBottomWidth: 0, borderTopWidth: 0}}
            onDateChange={date => setDate(date)}
          />
          <View style={styles.separator} />
          {/*<View style={styles.cycles}>*/}
          {/*    {*/}
          {/*        DELIVERY_CYCLES.map(c =>*/}
          {/*            <TouchableOpacity onPress={() => setCycle(c.id)} style={c.id === cycle?styles.activeItemContainer:styles.itemContainer}>*/}
          {/*                <Text style={c.id === cycle?styles.activeItemText:styles.itemText}>{c.text}</Text>*/}
          {/*            </TouchableOpacity>)*/}
          {/*    }*/}
          {/*</View>*/}
          {/*<View style={styles.separator}/>*/}
          {/*<View style={styles.times}>*/}
          {/*    {*/}
          {/*        DELIVERY_TIMES.map(t =>*/}
          {/*        <TouchableOpacity onPress={() => setTime(t.id)} style={t.id === time?styles.activeItemContainer:styles.itemContainer}>*/}
          {/*            <Text style={t.id === time?styles.activeItemText:styles.itemText}>{t.text}</Text>*/}
          {/*        </TouchableOpacity>)*/}
          {/*    }*/}
          {/*</View>*/}
          {/*<View style={styles.separator}/>*/}
          <View style={styles.actionsContainer}>
            <Button
              style={styles.submitBtn}
              title={I18n.t('Cancel')}
              type="white"
              size="X"
              onPress={onCancel}
              theme={theme}
            />
            <Button
              style={styles.submitBtn}
              title={I18n.t('Done')}
              type="primary"
              size="X"
              onPress={() => onDone({date, cycle, time})}
              theme={theme}
            />
          </View>
        </View>
      </BottomSheet>
    );
  },
);

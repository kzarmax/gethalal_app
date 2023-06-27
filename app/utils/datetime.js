import moment from 'moment';
import I18n from '../i18n';
import Moment from 'moment';

export const DATE_STRING_FORMAT = 'YYYY-MM-DD';
export const DATE_STRING_DISPLAY_FORMAT = 'ddd D MMM';
export const TIME_STRING_FORMAT = 'D MMM';
export const DATE_TIME_STRING_FORMAT = 'D MMM';

export const dateToString = (date, format) => {
  return moment(date.seconds * 1000).format(format);
};
export const dateStringFromNow = date => {
  let seconds = Math.floor((new Date() - new Date(date.seconds * 1000)) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    const value = Math.floor(interval);
    return (
      Math.floor(interval) +
      ' ' +
      (value > 1 ? I18n.t('years') : I18n.t('year')) +
      I18n.t('ago')
    );
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    const value = Math.floor(interval);
    return (
      Math.floor(interval) +
      ' ' +
      (value > 1 ? I18n.t('months') : I18n.t('month')) +
      I18n.t('ago')
    );
  }
  interval = seconds / 86400;
  if (interval > 1) {
    const value = Math.floor(interval);
    return (
      Math.floor(interval) +
      ' ' +
      (value > 1 ? I18n.t('days') : I18n.t('day')) +
      I18n.t('ago')
    );
  }
  interval = seconds / 3600;
  if (interval > 1) {
    const value = Math.floor(interval);
    return (
      Math.floor(interval) +
      ' ' +
      (value > 1 ? I18n.t('hours') : I18n.t('hour')) +
      I18n.t('ago')
    );
  }
  interval = seconds / 60;
  if (interval > 1) {
    const value = Math.floor(interval);
    return (
      Math.floor(interval) +
      ' ' +
      (value > 1 ? I18n.t('minutes') : I18n.t('minute')) +
      I18n.t('ago')
    );
  }
  return (
    Math.floor(seconds) +
    ' ' +
    (seconds > 1 ? I18n.t('seconds') : I18n.t('second')) +
    I18n.t('ago')
  );
};

export const date_str_format = function (dt, format = 'd MMM') {
  return Moment(dt).format(format);
};

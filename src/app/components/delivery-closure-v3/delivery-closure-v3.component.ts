import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import Holidays from 'date-holidays';

const hd = new Holidays();
const closureDates =
  '01/02/2021,01/03/2021,07/06/2021,09/08/2021,11/22/2021,11/23/2021,12/24/2021';

const currentYear = moment().format('YYYY');
const currentMonth = moment().format('MM');
const currentCardHealthHolidays = [
  "New Year's Day",
  'Martin Luther King Jr. Day',
  'Memorial Day',
  'Independence Day',
  'Labor Day',
  'Thanksgiving Day',
  'Christmas Day',
];

@Component({
  selector: 'app-delivery-closure-v3',
  templateUrl: './delivery-closure-v3.component.html',
  styleUrls: ['./delivery-closure-v3.component.sass'],
})
export class DeliveryClosureV3Component implements OnInit {
  monthQuarterMap = new Map();
  currentCalendarArray = [] as any;
  calendarArray = [] as any;
  days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  currentYearUI: string;
  monthUI;
  selectedMonth;
  selectedYear;
  isEnd: boolean;
  isEndYr: boolean;
  displayDateHeader = [] as any;
  displayYearSlider = [] as any;

  constructor() {}

  ngOnInit(): void {
    //this.currentCalendarArray = this.buildUI('07', currentYear);
    this.currentCalendarArray = this.buildUI(currentMonth, currentYear);
    this.selectedYearUI(currentYear.toString(), '');
    //console.log(this.displayYearSlider);
    this.isEnd = true;
    this.isEndYr = true;
    this.currentYearUI = currentYear;
    this.monthUI = currentMonth;
    // console.log(this.currentCalendarArray);
  }

  buildUI(selectedMth, selectedYr) {
    // console.log('In build UI ' + selectedMth + ' and ' + selectedYr);
    this.monthQuarterMap.clear();
    this.calendarArray = [];
    this.displayDateHeader = [];

    this.monthQuarterMap = this.buildMonth(selectedMth, parseInt(selectedYr));
    this.monthQuarterMap.forEach((value, key) => {
      this.calendarArray.push(
        this.buildMonthArr(key, value.days, value.start, selectedYr)
      );
      this.displayDateHeader.push(key);
    });

    this.monthQuarterMap.clear();
    return this.calendarArray;
  }

  selectedYearUI(curYear, type) {
    if (curYear == currentYear) {
      this.displayYearSlider = ['2020', '2021', '2022'];
    } else {
      this.displayYearSlider.push(curYear);
      if (type == 'next') {
        for (let i = 1; i < 3; i++) {
          let cYear = parseInt(curYear) + i;
          this.displayYearSlider.push(cYear.toString());
        }
      } else {
        for (let i = 1; i < 3; i++) {
          let cYear = parseInt(curYear) - i;
          this.displayYearSlider.push(cYear.toString());
        }
      }
    }

    return this.displayYearSlider;
  }

  public nextYear() {
    this.isEndYr = true;
    this.displayYearSlider = [];
    if (this.selectedYear && this.selectedYear !== 2021) {
      this.selectedYear = parseInt(this.selectedYear) + 1;
      this.selectYear('01', this.selectedYear, 'next');
    } else if (this.selectedYear === 2020) {
      this.selectYear('01', '2021', 'next');
      this.selectedYear = '2022';
    } else {
      this.selectedYear = parseInt(currentYear) + 1;
      this.selectYear('01', this.selectedYear, 'next');
    }
  }

  public prevYear() {
    this.displayYearSlider = [];
    if (this.selectedYear && this.selectedYear !== 2020) {
      this.selectedYear = parseInt(this.selectedYear) - 1;

      this.selectYear('01', this.selectedYear, 'prev');
    } else if (this.selectedYear === 2021) {
      this.isEndYr = false;
      this.selectYear('10', '2020', 'prev');
    } else if (this.selectYear == undefined && currentYear === '2021') {
      this.isEndYr = false;
      this.selectYear('10', '2020', 'prev');
    } else if (this.selectedYear === 2020) {
      this.isEndYr = false;
      this.selectYear('10', '2020', 'prev');
    } else {
      this.selectedYear = parseInt(currentYear) - 1;
      this.selectYear('10', this.selectedYear, 'prev');
    }
  }

  selectYear(selectedMth, selectedYr, type) {
    this.currentYearUI = selectedYr;
    this.selectedYearUI(selectedYr, type);
    this.currentCalendarArray = this.buildUI(selectedMth, selectedYr);
  }

  public nextMonth() {
    this.currentCalendarArray = [];
    // get current month and year
    this.isEnd = true;

    if (this.selectedMonth) {
      this.selectedMonth = parseInt(this.selectedMonth) + 1;
      if (this.selectedMonth.toString() === '11') {
        this.selectedMonth = '1';
        if (this.selectedYear === undefined) {
          this.selectedYear = parseInt(currentYear) + 1;
        } else {
          this.selectedYear = parseInt(this.selectedYear) + 1;
        }

        this.currentYearUI = this.selectedYear;
        this.monthUI = this.selectedMonth;

        this.currentCalendarArray = this.buildUI(
          this.selectedMonth,
          this.selectedYear.toString()
        );
      } else if (this.selectedYear) {
        this.currentCalendarArray = this.buildUI(
          this.selectedMonth,
          this.selectedYear
        );
      } else {
        this.currentCalendarArray = this.buildUI(
          this.selectedMonth,
          currentYear
        );
      }
    } else {
      // Fist Run

      let addMonth = parseInt(currentMonth) + 1;
      this.selectedMonth = addMonth.toString();
      this.currentCalendarArray = this.buildUI(
        addMonth.toString(),
        currentYear
      );
    }

    // check to see if month is 10 if true add 1 to year and set month to 1
  }

  public prevMonth() {
    let endMonth = '10';
    let endYear = '2020';

    console.log(' The selected Month ' + this.selectedMonth);

    if (this.selectedMonth) {
      if (this.selectedMonth == endMonth && this.selectedYear == endYear) {
        console.info(' The selected Month end ' + this.selectedMonth);
        this.isEnd = false;
        this.currentCalendarArray = this.buildUI(endMonth, endYear);
      } else if (this.selectedMonth == '1') {
        console.info('In selectedMth = 1');
        this.selectedYear = parseInt(currentYear) - 1;
        this.selectedMonth = '10';
        this.currentCalendarArray = this.buildUI(
          this.selectedMonth,
          this.selectedYear.toString()
        );
      } else {
        console.info('In selectedMth else ' + this.selectedMonth);
        this.selectedMonth = parseInt(this.selectedMonth) - 1;
        this.currentCalendarArray = this.buildUI(
          this.selectedMonth.toString(),
          currentYear
        );
      }
    } else {
      console.log(' The selected first Run ' + this.selectedMonth);
      let subtractMonth = parseInt(currentMonth) - 1;
      this.selectedMonth = subtractMonth.toString();
      this.currentCalendarArray = this.buildUI(
        subtractMonth.toString(),
        currentYear
      );
    }

    // get current month and year
    // get start month/ year 11/2020
    // check to see if month is 1 if true subtract 1 form year and set month to 10
  }

  private buildMonth(selectedMonth, selectedYear) {
    let dateObject = moment().set({
      year: parseInt(selectedYear),
      month: selectedMonth,
    });
    let quarterMap = new Map();

    const curDO = dateObject.format('MM');
    const curDaysInMonth = dateObject.daysInMonth();
    const curStartDay = dateObject.startOf('month').day();

    const nextDO = dateObject.add(1, 'month').format('MM');
    const nextDaysInMonth = dateObject.daysInMonth();
    const nextStartDay = dateObject.startOf('month').day();

    const prevDO = dateObject.subtract(2, 'month').format('MM');
    const prevDaysInMonth = dateObject.daysInMonth();
    const prevStartDay = dateObject.startOf('month').day();

    quarterMap.set(prevDO, { days: prevDaysInMonth, start: prevStartDay });
    quarterMap.set(curDO, { days: curDaysInMonth, start: curStartDay });
    quarterMap.set(nextDO, { days: nextDaysInMonth, start: nextStartDay });

    return quarterMap;
  }

  buildMonthArr(month, numOfDays, startDay, year) {
    let monthArray = [] as any;
    let day = {} as any;
    let noDate = {
      dateKey: '00/00/00',
      dateNumber: '0',
      dayOfWeek: '',
      isSelected: false,
      isPast: false,
      isDefault: false,
    };
    for (let i = 0; i < numOfDays; i++) {
      let dayNumStr = i + 1 < 10 ? '' + (i + 1).toString() : (i + 1).toString();
      let dateNumberStr = dayNumStr.length < 2 ? '0' + dayNumStr : dayNumStr;
      let fullDateStr = month + '/' + dateNumberStr + '/' + year;
      day = {
        dateKey: fullDateStr,
        dateNumber: dayNumStr,
        dayOfWeek: this.getDayOfWeek(fullDateStr),
        isSelected: this.getIsSelected(fullDateStr, closureDates),
        isPast: this.getIsPast(fullDateStr),
        isDefault: this.getIsDefault(fullDateStr),
      };

      monthArray.push(day);
    }
    if (monthArray[0].dateNumber === '1') {
      let numberOfDaysToAdd = startDay;
      for (let k = 0; k < numberOfDaysToAdd; k++) {
        // daySpare = noDate;
        monthArray.unshift(noDate);
      }
    }
    let endMth = 42 - monthArray.length;
    for (let l = 0; l < endMth; l++) {
      monthArray.push(noDate);
    }
    const [list, chunkSize] = [monthArray, 7];
    let newMonthArray = [...Array(Math.ceil(list.length / chunkSize))].map(
      (_) => list.splice(0, chunkSize)
    );

    return newMonthArray;
  }

  private getIsSelected(dateStr, closureDates) {
    const splitCDates = closureDates.split(',');
    return splitCDates.includes(dateStr);
  }

  private getDayOfWeek(dateStr) {
    const date = this.formatDateForMoment(dateStr);
    const myObj = moment(date);
    const dayOfWeek = myObj.format('ddd');
    return dayOfWeek;
  }

  private getIsPast(dateStr) {
    const date = this.formatDateForMoment(dateStr);
    const add14DaysToDate = moment().add(14, 'd').format('YYYY-MM-DD');
    const inDate = moment(date);
    const diff = inDate.diff(add14DaysToDate);
    return diff > 0 ? false : true;
  }

  private getIsDefault(dateStr) {
    let isDefault =
      this.getDayOfWeek(dateStr) === 'Sat' ||
      this.getDayOfWeek(dateStr) === 'Sun' ||
      this.getHolidays(dateStr)
        ? true
        : false;
    return isDefault;
  }
  private formatDateForMoment(dateStr) {
    const subDates = dateStr.split('/');
    return subDates[2] + '-' + subDates[0] + '-' + subDates[1];
  }


  private getHolidays(dateStr) {
    hd.init('US');
    const date = this.formatDateForMoment(dateStr) + ' 00:00:00';
    let isHoliday = hd.isHoliday(date);
    let isChHoliday;
    if(isHoliday){
      isChHoliday = currentCardHealthHolidays.includes(isHoliday[0].name);
    } else {
      isChHoliday = false
    }

    return isChHoliday;
  }

}

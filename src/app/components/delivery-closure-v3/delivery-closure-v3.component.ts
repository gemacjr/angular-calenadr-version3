import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import Holidays from 'date-holidays';

const hd = new Holidays();
const closureDates =
  '01/04/2021,07/05/2021,09/08/2021,11/22/2021,11/23/2021,12/24/2021';

const closureDatesMultpleYrs =
  '01/02/2021,01/03/2021,09/08/2021,11/22/2021,11/23/2021,12/24/2021,01/02/2022,01/03/2022,09/08/2023,11/22/2024,11/23/2022,12/24/2023,01/02/2025,01/03/2026,09/08/2027,11/22/2028,11/23/2029,12/24/2030';

const response = {
  transactionId: 'account-skjdfnkv89y34gfgdhgfjfytjcndsrg',
  userId: 'retind20',
  accountPreferenceDataList: [
    {
      preference:
        '01/02/2020,01/21/2020,07/02/2020,07/03/2020,09/08/2020,11/25/2020,11/27/2020,12/23/2020,12/24/2020',
      key: '9-671170|2020',
    },
    {
      preference:
        '01/02/2021,01/21/2021,07/02/2021,07/03/2021,09/08/2021,11/24/2021,11/26/2021,12/23/2021,12/24/2021',
      key: '9-671170|2021',
    },
    {
      preference:
        '01/04/2022,01/21/2022,07/02/2022,09/08/2022,11/25/2022,11/27/2022,12/23/2022,12/24/2022',
      key: '9-671170|2022',
    },
  ],
};

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
  displayDeliveryClosuresByMonth = [] as any;
  updatedClosureDates = [] as any;
  isDateSelected: boolean;

  lastEditedDate = 'Ed';
  lastEditedId = '12/00/2021';
  displayCurrentDisplayDates;

  addedDates = [] as any;
  removedDates = [] as any;
  closureDateArray = [] as any;

  constructor() {}

  ngOnInit(): void {
    //this.currentCalendarArray = this.buildUI('07', currentYear);
    this.selectedYear = currentYear;
    this.selectedMonth = currentMonth;
    this.closureDateArray = closureDates;
    this.displayCurrentDisplayDates = closureDates;

    this.currentCalendarArray = this.buildUI(
      this.selectedMonth,
      this.selectedYear,
      this.closureDateArray
    );

    this.displayCurrentPharmacyClosures(this.closureDateArray.split(','));
    this.displayUpdatedDeliveryClosuresByMonth();

    this.selectedYearUI(currentYear.toString(), '');
    ////console.log(this.displayYearSlider);
    this.isEnd = true;
    this.isEndYr = true;
    this.currentYearUI = currentYear;
    this.monthUI = currentMonth;
    // //console.log(this.currentCalendarArray);
  }

  private getPreferences(selectedYear, submit) {

  }

  getDateId(isSelectedNow: any, dateId: string) {
    console.log(isSelectedNow);
    console.log(dateId);
    this.isDateSelected = true;
    if (isSelectedNow === false) {
      this.closureDateArray += ',' + dateId;
      this.addedDates.push(dateId);
    } else {
      this.removedDates.push(dateId);
      let closeDatesArray = this.closureDateArray.split(',');
      let updatedCloseDates = closeDatesArray.filter((m) => m != dateId);
      this.closureDateArray = updatedCloseDates.toString();
    }
    this.currentCalendarArray = this.buildUI(
      this.selectedMonth,
      this.selectedYear,
      this.closureDateArray
    );


    console.log(this.closureDateArray);
  }

  buildUI(selectedMth, selectedYr, currentClosureDates) {
    // //console.log('In build UI ' + selectedMth + ' and ' + selectedYr);
    this.monthQuarterMap.clear();
    this.calendarArray = [];
    this.displayDateHeader = [];

    this.monthQuarterMap = this.buildMonth(selectedMth, parseInt(selectedYr));
    this.monthQuarterMap.forEach((value, key) => {
      this.calendarArray.push(
        this.buildMonthArr(
          key,
          value.days,
          value.start,
          selectedYr,
          currentClosureDates
        )
      );
      this.displayDateHeader.push(key);
    });
    //console.log(this.calendarArray);
    this.displayCurrentPharmacyClosures(currentClosureDates.split(','));
    this.displayUpdatedDeliveryClosuresByMonth();
    this.monthQuarterMap.clear();
    return this.calendarArray;
  }

  selectedYearUI(curYear, type) {
    // console.log(
    //   `&&&&&&&&&&&&&& in Selcted Year -> curYear ${curYear}  $##################'`
    // );
    if (curYear == currentYear || curYear == 2020) {
      this.displayYearSlider = ['2020', '2021', '2022'];
    } else {
      if (type == 'next') {
        this.displayYearSlider.push(curYear);
        for (let i = 1; i < 3; i++) {
          let cYear = parseInt(curYear) + i;
          this.displayYearSlider.push(cYear.toString());
        }
      } else {
        //console.log('######### if else ###########');
        for (let i = 1; i < 3; i++) {
          let cYear = parseInt(curYear) - i;
          this.displayYearSlider.push(cYear.toString());
        }
        this.displayYearSlider.push(curYear);
      }
    }
    //console.log(`In selectedYarUI -> ${this.displayYearSlider}`);
    this.displayYearSlider.sort(function (a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
    return this.displayYearSlider;
  }

  public displayCurrentState(mth, year) {
    console.warn(`The current State month -> ${mth} and year -> ${year}`);
    console.log(this.calendarArray);
  }
  public quickSelectYear(year) {
    console.log(year);
    this.currentYearUI = year;
    if (year == currentYear) {
      this.selectedMonth = currentMonth;
      this.selectedYear = currentYear;
      this.currentCalendarArray = this.buildUI(
        this.selectedMonth,
        this.selectedYear,
        this.closureDateArray
      );
    } else if (year == '2020') {
      this.selectedMonth = '10';
      this.selectedYear = year;
      this.currentCalendarArray = this.buildUI(
        this.selectedMonth,
        this.selectedYear,
        this.closureDateArray
      );
    } else {
      this.selectedMonth = '01';
      this.selectedYear = year;
      this.currentCalendarArray = this.buildUI(
        this.selectedMonth,
        this.selectedYear,
        this.closureDateArray
      );
    }
  }

  public nextYear() {
    this.isEndYr = true;
    this.isEnd = true;
    this.displayYearSlider = [];
    // console.log(
    //   `This is start nextYear  -> selectedMonth = ${this.selectedMonth} and selectedYear = ${this.selectedYear}`
    // );
    this.selectedMonth = '01';
    if (this.selectedYear && this.selectedYear !== 2021) {
      this.selectedYear = parseInt(this.selectedYear) + 1;
      this.selectYear(this.selectedMonth, this.selectedYear, 'next');
    } else if (this.selectedYear === 2020) {
      this.selectYear(this.selectedMonth, '2021', 'next');
      this.selectedYear = '2022';
    } else {
      this.selectedYear = parseInt(currentYear) + 1;
      this.selectYear(this.selectedMonth, this.selectedYear, 'next');
    }

    this.currentYearUI = this.selectedYear;
    this.monthUI = this.selectedMonth;

    // console.log(
    //   `This is end nextYear  -> selectedMonth = ${this.selectedMonth} and selectedYear = ${this.selectedYear}`
    // );

    this.displayCurrentState(this.selectedMonth, this.selectedYear);
  }
  public prevYear() {
    this.displayYearSlider = [];
    // console.log(
    //   `This is start prevMonth  -> selectedMonth = ${this.selectedMonth} and selectedYear = ${this.selectedYear}`
    // );

    if (this.selectedYear && this.selectedYear !== 2020) {
      this.selectedYear = parseInt(this.selectedYear) - 1;
      this.selectedMonth = '01';
      this.selectYear(this.selectedMonth, this.selectedYear, 'prev');
    } else if (
      this.selectedYear === 2021 ||
      (this.selectedYear == undefined && currentYear === '2021') ||
      this.selectedYear === 2020
    ) {
      this.isEndYr = false;
      this.isEnd = false;
      this.selectedMonth = '10';
      this.selectedYear = '2020';
      this.selectYear(this.selectedMonth, '2020', 'prev');
    } else {
      this.isEndYr = false;
      this.isEnd = false;
      this.selectedYear = parseInt(currentYear) - 1;
      this.selectedMonth = '10';
      this.selectYear(this.selectedMonth, this.selectedYear, 'prev');
    }

    this.currentYearUI = this.selectedYear;
    this.monthUI = this.selectedMonth;
    this.displayCurrentState(this.selectedMonth, this.selectedYear);
    // console.log(
    //   `This is end prevMonth  -> selectedMonth = ${this.selectedMonth} and selectedYear = ${this.selectedYear}`
    // );
  }

  // public prevYear() {
  //   this.displayYearSlider = [];
  //   if (this.selectedYear && this.selectedYear !== 2020) {
  //     this.selectedYear = parseInt(this.selectedYear) - 1;

  //     this.selectYear('01', this.selectedYear, 'prev');
  //   } else if (this.selectedYear === 2021) {
  //     this.isEndYr = false;
  //     this.selectYear('10', '2020', 'prev');
  //   } else if (this.selectedYear == undefined && currentYear === '2021') {
  //     this.isEndYr = false;
  //     this.selectYear('10', '2020', 'prev');
  //   } else if (this.selectedYear === 2020) {
  //     this.isEndYr = false;
  //     this.selectYear('10', '2020', 'prev');
  //   } else {
  //     this.isEndYr = false;
  //     this.selectedYear = parseInt(currentYear) - 1;
  //     this.selectYear('10', this.selectedYear, 'prev');
  //   }
  // }

  selectYear(selectedMth, selectedYr, type) {
    this.currentYearUI = selectedYr;
    this.selectedYearUI(selectedYr, type);
    this.currentCalendarArray = this.buildUI(
      selectedMth,
      selectedYr,
      this.closureDateArray
    );
  }

  // public nextMonth() {
  //   this.currentCalendarArray = [];
  //   console.log(`This is start nextMonth  -> selectedMonth = ${this.selectedMonth} and selectedYear = ${this.selectedYear}`)
  //   // get current month and year
  //   this.isEnd = true;
  //   // check for this.selectedMonth and this.selctedYear is not populated
  //   // if(this.selectedMonth && this.selctedYear )

  //   if (this.selectedMonth) {
  //     this.selectedMonth = parseInt(this.selectedMonth) + 1;
  //     if (this.selectedMonth.toString() === '11') {
  //       this.selectedMonth = '1';
  //       if (this.selectedYear === undefined) {
  //         this.selectedYear = parseInt(currentYear) + 1;
  //       } else {
  //         this.selectedYear = parseInt(this.selectedYear) + 1;
  //       }

  //       this.currentYearUI = this.selectedYear;
  //       this.monthUI = this.selectedMonth;

  //       this.currentCalendarArray = this.buildUI(
  //         this.selectedMonth,
  //         this.selectedYear.toString()
  //       );
  //     } else if (this.selectedYear) {
  //       this.currentCalendarArray = this.buildUI(
  //         this.selectedMonth,
  //         this.selectedYear
  //       );
  //     } else {
  //       this.currentCalendarArray = this.buildUI(
  //         this.selectedMonth,
  //         currentYear
  //       );
  //     }
  //   } else {
  //     // Fist Run

  //     let addMonth = parseInt(currentMonth) + 1;
  //     this.selectedMonth = addMonth.toString();
  //     this.currentCalendarArray = this.buildUI(
  //       addMonth.toString(),
  //       currentYear
  //     );
  //   }
  //   console.log(
  //     `This is End nextMonth  -> selectedMonth = ${this.selectedMonth} and selectedYear = ${this.selectedYear}`
  //   );

  //   // check to see if month is 10 if true add 1 to year and set month to 1
  // }

  public nextMonth() {
    this.currentCalendarArray = [];
    this.displayYearSlider = [];
    // console.error(
    //   `This is start nextMonth  -> selectedMonth = ${this.selectedMonth} and selectedYear = ${this.selectedYear}`
    // );
    // get current month and year
    this.isEnd = true;
    this.isEndYr = true;
    if (this.selectedMonth && this.selectedYear) {
      console.error(
        `FIRST IF -> selectedMonth = ${this.selectedMonth} and selectedYear = ${this.selectedYear}`
      );
      if (this.selectedMonth == 10) {
        this.selectedMonth = '01';
        this.selectedYear = parseInt(this.selectedYear) + 1;
        this.selectedYearUI(this.selectedYear, 'next');
        this.currentCalendarArray = this.buildUI(
          this.selectedMonth,
          this.selectedYear,
          this.closureDateArray
        );
      } else if (this.selectedMonth == 10 && this.selectedYear == 2020) {
        //console.log('IM heere');
        this.selectedMonth = '01';
        this.selectedYear = parseInt(this.selectedYear) + 1;
        this.selectedYearUI(this.selectedYear, 'next');
        this.currentCalendarArray = this.buildUI(
          this.selectedMonth,
          this.selectedYear,
          this.closureDateArray
        );
      } else {
        this.selectedMonth = parseInt(this.selectedMonth) + 1;
        this.selectedYearUI(this.selectedYear, 'next');
        this.currentCalendarArray = this.buildUI(
          this.selectedMonth,
          this.selectedYear,
          this.closureDateArray
        );
      }
    } else if (this.selectedMonth && this.selectedYear === undefined) {
      this.selectedMonth = parseInt(this.selectedMonth) + 1;

      if (this.selectedMonth.toString() === '11') {
        this.selectedMonth = '01';
        this.selectedYear = parseInt(currentYear) + 1;
        this.selectedYearUI(this.selectedYear, 'next');
        this.currentCalendarArray = this.buildUI(
          this.selectedMonth,
          this.selectedYear.toString(),
          this.closureDateArray
        );
      } else {
        this.selectedYearUI(this.selectedYear, 'next');
        this.currentCalendarArray = this.buildUI(
          this.selectedMonth,
          this.selectedYear,
          this.closureDateArray
        );
      }
    } else {
      let addMonth = parseInt(currentMonth) + 1;
      this.selectedMonth = addMonth.toString();
      this.selectedYear = currentYear;
      this.selectedYearUI(this.selectedYear, 'next');
      this.currentCalendarArray = this.buildUI(
        addMonth.toString(),
        this.selectedYear,
        this.closureDateArray
      );
    }
    //console.warn(`This is end nextMonth  -> selectedMonth = ${this.selectedMonth} and selectedYear = ${this.selectedYear}`);

    this.currentYearUI = this.selectedYear;
    this.monthUI = this.selectedMonth;

    this.displayCurrentState(this.selectedMonth, this.selectedYear);
  }

  public prevMonth() {
    let endMonth = '10';
    let endYear = '2020';
    this.displayYearSlider = [];

    //console.warn(`This is start prevMonth  -> selectedMonth = ${this.selectedMonth} and selectedYear = ${this.selectedYear}`);

    if (this.selectedMonth) {
      if (this.selectedMonth == endMonth && this.selectedYear == endYear) {
        //console.info(' The selected Month end ' + this.selectedMonth);
        this.isEnd = false;
        this.currentCalendarArray = this.buildUI(
          endMonth,
          endYear,
          this.closureDateArray
        );
      } else if (this.selectedMonth == '01' && this.selectedYear) {
        this.selectedYear = parseInt(this.selectedYear) - 1;
        this.selectedMonth = '10';
        this.currentCalendarArray = this.buildUI(
          this.selectedMonth,
          this.selectedYear.toString(),
          this.closureDateArray
        );
      } else if (this.selectedMonth == '01') {
        this.isEnd = false;
        this.selectedYear = parseInt(currentYear) - 1;
        this.selectedMonth = '10';
        this.currentCalendarArray = this.buildUI(
          this.selectedMonth,
          this.selectedYear.toString(),
          this.closureDateArray
        );
      } else if (this.selectedMonth == '01' && this.selectedYear == '2021') {
        this.selectedMonth = '10';
        this.selectedYear = '2020';
        this.currentCalendarArray = this.buildUI(
          this.selectedMonth,
          this.selectedYear,
          this.closureDateArray
        );
      } else {
        //console.info('In selectedMth else ' + this.selectedMonth);
        this.selectedMonth = parseInt(this.selectedMonth) - 1;
        this.currentCalendarArray = this.buildUI(
          this.selectedMonth.toString(),
          currentYear,
          this.closureDateArray
        );
      }
    } else {
      //console.log(' The selected first Run ' + this.selectedMonth);
      let subtractMonth = parseInt(currentMonth) - 1;
      this.selectedMonth = subtractMonth.toString();
      this.selectedYear = currentYear;
      this.currentCalendarArray = this.buildUI(
        subtractMonth.toString(),
        currentYear,
        this.closureDateArray
      );
    }
    this.currentYearUI = this.selectedYear;
    this.monthUI = this.selectedMonth;
    this.selectedYearUI(this.selectedYear, 'prev');

    this.displayCurrentState(this.selectedMonth, this.selectedYear);

    // console.error(
    //   `This is end prevMonth  -> selectedMonth = ${this.selectedMonth} and selectedYear = ${this.selectedYear}`
    // );

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

  buildMonthArr(month, numOfDays, startDay, year, currentClosureDates) {
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
        isSelected: this.getIsSelected(fullDateStr, currentClosureDates),
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
    if (isHoliday) {
      isChHoliday = currentCardHealthHolidays.includes(isHoliday[0].name);
    } else {
      isChHoliday = false;
    }

    return isChHoliday;
  }

  displayCurrentPharmacyClosures(updatedClosureDates) {
    let dayClosure = {};
    this.updatedClosureDates = [];

    // console.error('This is updatedClosureSDatea : ' + updatedClosureDates);

    for (let i = 0; i < updatedClosureDates.length; i++) {
      let tmpDay = updatedClosureDates[i];
      let dateStr = tmpDay.split('/');
      let month = dateStr[0];
      let dayNumStr = dateStr[1];
      let year = dateStr[2];
      let currentDateStr = month + '/' + dayNumStr + '/' + year;

      dayClosure = {
        dateKey: currentDateStr,
        dateNumber: dayNumStr,
        dayOfWeek: this.getDayOfWeek(currentDateStr),
        isSelected: this.getIsSelected(currentDateStr, this.closureDateArray),
        isPast: this.getIsPast(currentDateStr),
        isDefault: this.getIsDefault(currentDateStr),
      };
      this.updatedClosureDates.push(dayClosure);
    }

    return this.updatedClosureDates;
  }

  displayUpdatedDeliveryClosuresByMonth() {
    let jan = [],
      feb = [],
      mar = [],
      apr = [],
      may = [],
      jun = [],
      jul = [],
      aug = [],
      sep = [],
      oct = [],
      nov = [],
      dec = [];
    let currentClosuresObj = this.displayCurrentPharmacyClosures(
      this.closureDateArray.split(',')
    );
    currentClosuresObj.forEach((day) => {
      let month = day.dateKey.split('/')[0];
      switch (month) {
        case '01':
          jan.push(day);
          break;
        case '02':
          feb.push(day);
          break;
        case '03':
          mar.push(day);
          break;
        case '04':
          apr.push(day);
          break;
        case '05':
          may.push(day);
          break;
        case '06':
          jun.push(day);
          break;
        case '07':
          jul.push(day);
          break;
        case '08':
          aug.push(day);
          break;
        case '09':
          sep.push(day);
          break;
        case '10':
          oct.push(day);
          break;
        case '11':
          nov.push(day);
          break;
        case '12':
          dec.push(day);
          break;
      }
    });
    this.displayDeliveryClosuresByMonth = [
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec,
    ];
    return this.displayDeliveryClosuresByMonth;
  }
}

/**
 * Stopwatch class for time measurement.
 *
 * @author Stefan Schnell <mail@stefan-schnell.de>
 * @license MIT
 * @version 0.1.0
 *
 * Checked with Rhino engines version 1.7R4 and 1.7.14
 */

var stopWatch = function() {

  this.pointsInTime = [];
  this._elapsedTime = 0;
  this._startTime = 0;
  this._stopTime = 0;

};

stopWatch.prototype = {

  /**
   * Delivers the elapsed time between start and stop.
   *
   * @function elapsedTime
   * @returns {number}
   *
   * @example
   * var oStopWatch = new stopWatch();
   * oStopWatch.start();
   * System.sleep(250);
   * oStopWatch.stop();
   * System.log(oStopWatch.elapsedTime());
   */
  elapsedTime : function() {
    return this._elapsedTime;
  },

  /**
   * Sets a point in time in an array.
   * This allows you to set intermediate points that can be used in
   * a time measurement. They are stored in an array, so they can be
   * accessed using its methods.
   *
   * @function pointInTime
   *
   * @example
   * var oStopWatch = new stopWatch();
   * oStopWatch.start();
   * System.sleep(250);
   * oStopWatch.pointInTime();
   * System.sleep(250);
   * oStopWatch.stop();
   * oStopWatch.pointsInTime.forEach( function(pointInTime) {
   *   System.log(pointInTime);
   * });
   */
  pointInTime : function() {
    this.pointsInTime.push(Date.now());
  },

  /**
   * Starts the time measurement.
   *
   * @function start
   *
   * @example
   * var oStopWatch = new stopWatch();
   * oStopWatch.start();
   * System.sleep(250);
   * oStopWatch.stop();
   * System.log(oStopWatch.elapsedTime());
   */
  start : function() {
    this._startTime = Date.now();
    this.pointsInTime.push(this._startTime);
  },

  /**
   * Stops the time measurement.
   *
   * @function stop
   *
   * @example
   * var oStopWatch = new stopWatch();
   * oStopWatch.start();
   * System.sleep(250);
   * oStopWatch.stop();
   * System.log(oStopWatch.elapsedTime());
   */
  stop : function() {
    this._stopTime = Date.now();
    this.pointsInTime.push(this._stopTime);
    this._elapsedTime = this._stopTime - this._startTime;
  }

};

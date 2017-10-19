// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    hasRowConflictAt: function(rowIndex) {
      // console.log("I'm running");
    //set a variable called sum that would store the sum of the values in any given row
    //iterate through the given row
    // in each iteration, add the value of current iteration/index to the sum variable
    //after iteration, check the value of sum is greater than 1
    //if value of sum is greater than 1, return true. If not, return false.
      var sum = 0;
      _.each(this.get(rowIndex), function(item) {
        sum += item;
      });
      if (sum > 1) {
        return true;
      } else {
        return false;
      }  
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // iterate through each row
      // for each row, call hasrowconflict at each row
      // if rowconflict is true in any iteration, return true
      //after full iteration over all rows, return false
      var result = false;
      var context = this;
      // var hasRowConflictAt = this.hasRowConflictAt.bind(this);
      _.each(this.rows(), function(item, index) {
        
        if (context.hasRowConflictAt(index)) {
          result = true;
        }
      });
      
      return result;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //initialize a variable columnArray to store values in column index
      //intialize variable columnSum that stores sum of all column values
      //loop through all rows and push values at that column index to the column array
      //loop through column array to get sum of values in the array
      //if sum is greater than 1, return true. If not, return false
      var columnArray = [];
      var columnSum = 0;
      _.each(this.rows(), function(item) {
        columnArray.push(item[colIndex]);
      });
      _.each(columnArray, function(item) {
        columnSum += item;
      });
      if (columnSum > 1) {
        return true;
      } else {
        return false; // fixme

      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //use a for loop that iterates the number of rows length
      // in each iteration, call hasColConflict at that index
      // if the value of hasColConflict is true, then return true immediately
      // following for loop, return false in the event that loop finishes without returning true
      for ( var i = 0; i < this.rows().length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },


    //  _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
    //   return colIndex - rowIndex;
    // },

    // _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
    //   return colIndex + rowIndex;
    // },
    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // define a variable to store diagonal values
      var diagonals = [];
      // define a variable to store sum starting at 0
      var sum = 0;
      // loop through object of rows
      var _getFirstRowColumnIndexForMajorDiagonalOn = this._getFirstRowColumnIndexForMajorDiagonalOn.bind(this);
      _.each(this.rows(), function(row, rowIndex) {
        // for each row loop through all values
        _.each(row, function(value, colIndex) {
          // for each value check if it's getFirstRowColum.... equals the majorDiagIndex argument
          if (_getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex) === majorDiagonalColumnIndexAtFirstRow) {
            //push the value to the diagonal values array
            diagonals.push(value);
          }
        });
      });
      // loop through diagonal values array
      _.each(diagonals, function(value) {
        // for each item add 1 to sum
        sum += value;
      });
      // if sum is greater than 1
      if (sum > 1) {
        //return true
        return true;
      } else {
        return false; // fixme
      }
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // create var n to store rows length minus 1
      var firstRowColumnIndex = this.rows().length - 1;
      // loop from negative n to positive n
      for (var i = -firstRowColumnIndex; i <= firstRowColumnIndex; i++) {
        //at each index check if hasMajorDiagonalConflictAt
        if (this.hasMajorDiagonalConflictAt(i)) {
          //return true
          return true;
        }
      }
    
      //return false if for loop completes without returning true
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // define a variable to store diagonal values
      var diagonals = [];
      // define a variable to store sum starting at 0
      var sum = 0;
      // loop through object of rows
      var _getFirstRowColumnIndexForMinorDiagonalOn = this._getFirstRowColumnIndexForMinorDiagonalOn.bind(this);
      _.each(this.rows(), function(row, rowIndex) {
        // for each row loop through all values
        _.each(row, function(value, colIndex) {
          // for each value check if it's getFirstRowColum.... equals the majorDiagIndex argument
          if (_getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex) === minorDiagonalColumnIndexAtFirstRow) {
            //push the value to the diagonal values array
            diagonals.push(value);
          }
        });
      });
      // loop through diagonal values array
      _.each(diagonals, function(value) {
        // for each item add 1 to sum
        sum += value;
      });
      // if sum is greater than 1
      if (sum > 1) {
        //return true
        return true;
      } else {
        return false; // fixme
      }
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // create var n to store rows length minus 1
      var firstRowColumnIndex = this.rows().length - 1;
      // loop from negative n to positive n
      for (var i = 0; i <= firstRowColumnIndex * 2; i++) {
        //at each index check if hasMajorDiagonalConflictAt
        if (this.hasMinorDiagonalConflictAt(i)) {
          //return true
          return true;
        }
      }
    
      //return false if for loop completes without returning true
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

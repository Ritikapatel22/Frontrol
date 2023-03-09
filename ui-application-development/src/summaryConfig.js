/**
 * Application configuration
 */

const useGridConfig = (props) => {

  return {
    columns: [
      {
        field: "aging",
        text: "Aging",
        htmlEncodeHeaderText: false,
      },
      {
        field: "bucket1",
        text: "Feb-20",
        flex: 1,
      },
      {
        field: "bucket2",
        text: "Mar-20",
        flex: 1,
      },
      {
        field: "bucket3",
        text: "Apr-20",
        flex: 1,
      },
      {
        field: "bucket4",
        text: "May-20",
        flex: 1,
      },
      {
        field: "bucket5",
        text: "Jun-20",
        flex: 1,
      },
      {
        field: "bucket6",
        text: "Jul-20",
        flex: 1,
      },
      {
        field: "bucket7",
        text: "Aug-20",
        flex: 1,
      },
      {
        field: "bucket8",
        text: "Sep-20",
        flex: 1,
      },
      {
        field: "bucket9",
        text: "Oct-20",
        flex: 1,
      },
      {
        field: "bucket10",
        text: "Nov-20",
        flex: 1,
      },
      {
        field: "bucket11",
        text: "Dec-20",
        flex: 1,
      },
      {
        field: "bucket12",
        text: "Jan-20",
        flex: 1,
      },
      {
        field: "bucket13",
        text: "Current Month",
        flex: 1,
      },
      // {
      //     field: 'original',
      //     text: 'Original',
      //     htmlEncodeHeaderText: false,
      //     align: 'center',
      //     width: 120,
      //     hidden: false
      // },
      // {
      //     field: 'division',
      //     text: 'Division',
      //     flex: 1,
      //     hidden: true
      // },
      // { field: 'conference', text: 'Conference', flex: 1 },
      // {
      //     field: 'team',
      //     text:
      //         'Cheer<div class="small-text">(React component)</div>',
      //     htmlEncodeHeaderText: false,
      //     width: 200,
      //     editor: false
      //     // Using custom React component
      // }
    ],

    // Store will be created automatically, `syncDataOnLoad` is `true` by default (set in the wrapper)
    data: props,
  };
};

export { useGridConfig };

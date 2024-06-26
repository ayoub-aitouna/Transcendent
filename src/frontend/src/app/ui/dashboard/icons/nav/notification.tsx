
const NotificationLogo: React.FC<any> = ({  ...props }) => (
	<svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill={'#545454'}
    {...props}
  >
    <path
	  fill="#545454"
      d="M3 8.952a6 6 0 0 1 4.03-5.67 2 2 0 1 1 3.95 0A6 6 0 0 1 15 8.952v6l3 2v1H0v-1l3-2v-6Zm8 10a2 2 0 1 1-4 0h4Z"
    />
  </svg>
)



export default NotificationLogo;

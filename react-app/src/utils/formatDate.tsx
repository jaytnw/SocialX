import dayjs from 'dayjs';

export default function formatDate(dateString: string) {

    const date = dayjs(dateString);
    return date.format('MMM D, YYYY, h:mm:ss A');
};



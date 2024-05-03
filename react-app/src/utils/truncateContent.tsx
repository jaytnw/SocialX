const truncateContent = (content: string): string => {
    return content.length > 250 ? content.slice(0, 250) + '...' : content;
};

export default truncateContent;

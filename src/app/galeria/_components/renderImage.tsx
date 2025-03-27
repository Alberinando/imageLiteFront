import React from "react";
import ImageCard from "@/components/imageCard/imageCard";
import ImageResource from "@/resources/image/image.resource";

const renderImage = (props: ImageResource) => {
    return(
        <ImageCard
            url={props.url}
            name={props.name}
            size={props.size}
            dataUpload={props.uploadDate}
            extension={props.extension} />
    )
}

export default React.memo(renderImage);

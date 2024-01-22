function PreviewComponent({
	elementInstance,
}: {
	elementInstance: PageBlockInstance;
}) {
	const images = elementInstance.additionalProperties!.path as string[];
	return (
		<div className={styles.sliderContainer}>
			<CustomSlider>
				{images.map((url, i) => (
					<Slide key={i} img={url} text={url} />
				))}
			</CustomSlider>
		</div>
	);
}

export default PreviewComponent;
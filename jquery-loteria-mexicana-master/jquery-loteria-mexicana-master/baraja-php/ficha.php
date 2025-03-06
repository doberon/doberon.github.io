<?php

$nuestraImagen = imagecreate(612, 690);
$colorFondo=imagecolorallocate($nuestraImagen, 0xE6, 0xD8, 0xE9);
imagefilledrectangle($nuestraImagen, 0, 0, 612, 690, $negro);	
header("Content-Type: image/png");
imagepng($nuestraImagen);

?>
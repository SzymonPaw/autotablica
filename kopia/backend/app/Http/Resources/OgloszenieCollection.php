<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class OgloszenieCollection extends ResourceCollection
{
    /**
     * The resource that this resource collects.
     *
     * @var class-string<OgloszenieResource>
     */
    public $collects = OgloszenieResource::class;

    /**
     * Transform the resource collection into an array.
     */
    public function toArray($request): array
    {
        return parent::toArray($request);
    }
}

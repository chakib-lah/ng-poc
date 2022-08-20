<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MoviePhotoRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;


/**
 * @Vich\Uploadable()
 */
#[ORM\Entity(repositoryClass: MoviePhotoRepository::class)]
#[ApiResource(
    collectionOperations: [
        'get',
        'post' => [
            'input_formats' => [
                'multipart' => ['multipart/form-data'],
            ],
        ],
    ],
    denormalizationContext: ['groups' => ['moviePhoto:write']],
    normalizationContext: ['groups' => ['moviePhoto:read']],
)]
class MoviePhoto
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Movie::class, inversedBy: 'moviesPhotos')]
    #[Groups(['moviePhoto:write', 'moviePhoto:read'])]
    private $movies;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['moviePhoto:read'])]
    private $photoPath;

    /**
     * @Vich\UploadableField(mapping="movies", fileNameProperty="photoPath")
     */
    #[Groups(['moviePhoto:write', 'moviePhoto:read'])]
    public ?File $photsFile = null;

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Movie|null
     */
    public function getMovies(): ?Movie
    {
        return $this->movies;
    }

    /**
     * @param Movie|null $movies
     * @return $this
     */
    public function setMovies(?Movie $movies): self
    {
        $this->movies = $movies;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getPhotoPath(): ?string
    {
        return $this->photoPath;
    }

    /**
     * @param string $photoPath
     * @return $this
     */
    public function setPhotoPath(string $photoPath): self
    {
        $this->photoPath = $photoPath;

        return $this;
    }
}
